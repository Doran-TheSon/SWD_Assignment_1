'use client'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="text-lg font-bold hover:opacity-80">
        E-Commerce
      </Link>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        {/* // components/Navbar.tsx */}
        {session ? (
          <>
            <Link href="/create">Create</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/orders">My Orders</Link>
            <button onClick={() => signOut()} className="underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  )
}
