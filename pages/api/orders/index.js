import connectDB from '@/utils/db'
import Order from '@/models/Order'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ error: 'Unauthorized' })

    const { items, total } = req.body
    const order = await Order.create({
      userEmail: session.user.email,
      items,
      total,
      status: 'unpaid',
    })

    return res.status(201).json(order)
  }

  if (req.method === 'GET') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ error: 'Unauthorized' })

    const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 })
    return res.status(200).json(orders)
  }

  return res.status(405).end()
}
