'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import useRequireAuth from '@/lib/useRequireAuth'
interface Product {
  _id: string
  name: string
  description: string
  price: number
  image?: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const { status } = useRequireAuth()
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id}>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
            )}
            <div className="border p-4 rounded shadow">
              <h2 className="font-bold text-lg">{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <Link
                className="text-blue-500 underline"
                href={`/products/${product._id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
