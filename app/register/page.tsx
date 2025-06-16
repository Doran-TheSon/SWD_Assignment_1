'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success("Registered! Please login.")
      router.push("/login")
    } else {
      const data = await res.json()
      toast.error(data.error || "Registration failed")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-10">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  )
}
