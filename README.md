## Minimum Next-auth Example for Next.js + Cloudflare + D1 + Drizzle

### Setup
- Install dependencies with `bun install`
- Copy the `example.env.local` to `.env.local`
- Fill in the required fields
- Update your `wrangler.toml` file

### Potential Issues
- If you get `TypeError: immutable`
    - This means it can't access / reach your local sqlite user table
    - Make sure to run `bun migrate:dev`
