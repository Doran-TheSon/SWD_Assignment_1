'use client'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/useCart'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, isLoaded } = useCart()

  if (!isLoaded) return <p className="text-center mt-8">Loading cart...</p>

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="border p-4 rounded flex items-center justify-between gap-4">
              {/* Text content (left) */}
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => updateQuantity(item._id, Number(e.target.value))}
                  className="border w-16 mt-1"
                  min={1}
                />
                <button
                  className="text-red-500 ml-4"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>

              {/* Image (right) */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
            </div>
          ))}

          <p className="font-bold">Total: ${total.toFixed(2)}</p>
          <Link href="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  )
}
