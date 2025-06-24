// lib/types.ts

export interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  _id: string
  status: string
  total: number
  items: OrderItem[]
}
