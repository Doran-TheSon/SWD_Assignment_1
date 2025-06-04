'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  })

  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setForm({ ...form, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      toast.success('add successful')
      router.push('/')
    } catch (error) {
      toast.error('add unsuccessful')
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-10 w-10 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
          disabled={loading}
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full"
          type="number"
          required
          min="0"
          step="0.01"
          disabled={loading}
        />

        <div>
          <label className="block mb-1 font-semibold">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} disabled={loading} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-48 h-48 object-cover rounded" />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white w-full ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Processing...' : 'Create'}
        </button>
      </form>
    </div>
  )
}
