// app/layout.js
import './globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
export const metadata = {
  title: 'SoniqueTeam-Commerce',
  description: 'Members store',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  )
}
