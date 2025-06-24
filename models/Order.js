// models/Order.js
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  status: { type: String, default: 'unpaid' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
