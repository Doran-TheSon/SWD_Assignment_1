'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // lưu base64 hoặc URL ảnh
  })

  const [imagePreview, setImagePreview] = useState('') // để preview ảnh local
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Xử lý input text, number
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Xử lý chọn file ảnh
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Tạo preview ảnh local
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setForm({ ...form, image: reader.result}) // lưu base64 ảnh vào form.image
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      // Gửi dữ liệu (bao gồm image base64) lên API
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        throw new Error('Failed to create product')
      }
      router.push('/')
    } catch (error) {
      console.error(error)
      alert('Failed to create product')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
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
        className={`px-4 py-2 rounded text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mx-auto"
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
        ) : (
          'Create'
        )}
      </button>
    </form>
  )
}
