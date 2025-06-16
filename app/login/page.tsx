'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        })

        if (res?.error) {
            toast.error("Login failed")
        } else {
            toast.success("Logged in")
            router.push("/")
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </form>
    )
}
