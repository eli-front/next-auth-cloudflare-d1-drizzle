import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { drizzle } from "drizzle-orm/d1"
import { getRequestContext } from "@cloudflare/next-on-pages"
import { accounts, sessions, users, verificationTokens } from "./schema"
import GitHub from "next-auth/providers/github"


export const { handlers, auth, signIn, signOut } = NextAuth(() => {

  const db = drizzle(getRequestContext().env.DB)

  return {
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    session: { strategy: "jwt" },
    providers: [GitHub],
  }
})
