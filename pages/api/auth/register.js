import connectDB from "@/utils/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  await connectDB()
  const { email, password } = req.body

  const existingUser = await User.findOne({ email })
  if (existingUser) return res.status(400).json({ error: "Email already in use" })

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({ email, password: hashedPassword })
  return res.status(201).json({ message: "User created", user })
}
