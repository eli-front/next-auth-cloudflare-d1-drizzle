"use client"

import Link from "next/link"

export default function Page() {
  return (
    <>
      <Link href="/api/auth/signin">Sign in</Link>
    </>
  )
}

export const runtime = 'edge'
