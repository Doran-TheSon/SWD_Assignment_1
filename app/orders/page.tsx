'use client'
import { useEffect, useState } from 'react'
import { Order } from '@/lib/types'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="border p-4 mb-4 rounded">
            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <p>Items:</p>
            <ul className="list-disc ml-5">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}
