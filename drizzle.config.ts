import { defineConfig, Config } from 'drizzle-kit';
import { config as dotenvConfig } from 'dotenv';

import fs from 'fs';
import path from 'path';

// https://github.com/drizzle-team/drizzle-orm/discussions/1545#discussioncomment-9642932
function getLocalD1DB() {
  try {
    const basePath = path.resolve('.wrangler');
    const dbFile = fs
      .readdirSync(basePath, { encoding: 'utf-8', recursive: true })
      .find((f) => f.endsWith('.sqlite'));

    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }

    const url = path.resolve(basePath, dbFile);
    return url;
  } catch (err: any) {
    console.log(`Error  ${err.message}`);
  }
}

dotenvConfig({ path: '.env.local' });


const config: Config = {
  schema: './schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  ...(process.env.NODE_ENV === 'production' ? {
    driver: 'd1-http',
    dbCredentials: {
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
      databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
      token: process.env.CLOUDFLARE_TOKEN!
    }
  } : {
    dbCredentials: {
      url: getLocalD1DB()
    }
  })
};

export default defineConfig(config);

