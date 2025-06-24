import { useState, useEffect } from 'react'
import { CartItem } from './types'

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(localCart)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (product: CartItem, quantity = 1) => {
    setCart(prev => {
      const exist = prev.find(p => p._id === product._id)
      if (exist) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + quantity } : p
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (id: string) =>
    setCart(cart.filter(item => item._id !== id))

  const updateQuantity = (id: string, quantity: number) =>
    setCart(cart.map(item => (item._id === id ? { ...item, quantity } : item)))

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total, isLoaded }
}
