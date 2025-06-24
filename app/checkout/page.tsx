'use client'
import { useCart } from '@/lib/useCart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const router = useRouter()

  const handleCheckout = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, total }),
    })

    if (res.ok) {
      toast.success('Order placed!')
      clearCart()
      router.push('/orders')
    } else {
      toast.error('Failed to place order')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Confirm Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-disc ml-5">
            {cart.map(item => (
              <li key={item._id}>
                {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  )
}
