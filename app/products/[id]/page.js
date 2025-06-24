'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useRequireAuth from '../../../lib/useRequireAuth'
import { useCart } from '@/lib/useCart'

export default function ProductDetail() {
  const { status } = useRequireAuth()
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setImagePreview(data.image || '')
      })
  }, [id])

  const handleChange = (e) => {
    if (!product) return
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    if (!product) return
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setProduct({ ...product, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = async () => {
    if (!product) return
    setLoading(true)

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (!res.ok) throw new Error('Failed to update')

      toast.success('Product updated successfully!')
      setEditMode(false)
    } catch (error) {
      console.error(error)
      toast.error('Failed to update product.')
    }

    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setLoading(true)
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      router.push('/')
      toast.success('Delete successful')
    } catch (error) {
      toast.error('Failed to delete product')
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity)
    toast.success('Added to cart!')
    console.log('📦 Cart saved:', JSON.parse(localStorage.getItem('cart') || '[]'))

  }

  if (!product) return <p>Loading...</p>

  return (
    <div className="space-y-4 max-w-md mx-auto mt-10">
      {editMode ? (
        <>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border p-2 w-full"
            disabled={loading}
            required
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full"
            disabled={loading}
            required
          />
          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full"
            type="number"
            min="0"
            step="0.01"
            disabled={loading}
            required
          />

          <div>
            <label className="block mb-1 font-semibold">Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} disabled={loading} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-48 h-48 object-cover rounded"
              />
            )}
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
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
              'Save'
            )}
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover rounded mb-4"
            />
          )}
          <p>{product.description}</p>
          <p>${product.price}</p>

          {/* Add to Cart section */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="border w-16 p-1"
            />
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2 mt-6">
        <button
          onClick={() => setEditMode(!editMode)}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
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
            'Delete'
          )}
        </button>
      </div>
    </div>
  )
}
