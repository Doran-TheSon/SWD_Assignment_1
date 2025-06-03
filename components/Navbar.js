'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="text-lg font-bold">E-Commerce</div>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/create">Create</Link>
      </div>
    </nav>
  )
}
