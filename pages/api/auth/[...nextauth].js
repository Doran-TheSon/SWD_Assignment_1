import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '@/utils/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if (!user) throw new Error('No user found')

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) throw new Error('Invalid password')

        return { id: user._id, email: user.email }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// ✅ Export default NextAuth với options đã khai báo ở trên
export default NextAuth(authOptions)
