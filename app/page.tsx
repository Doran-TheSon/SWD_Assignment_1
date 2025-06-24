'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image?: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setCurrentPage(1) // reset về trang đầu khi search
        }}
        className="border p-2 mb-4 w-full md:w-1/2"
      />

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentProducts.length === 0 ? (
          <p className="col-span-full text-center">No products found.</p>
        ) : (
          currentProducts.map(product => (
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
          ))
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
