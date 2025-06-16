import './globals.css'
import Navbar from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import SessionWrapper from '../components/SessionWrapper'

export const metadata = {
  title: 'SoniqueTeam-Commerce',
  description: 'Members store',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Navbar />
          <main className="p-4">{children}</main>
          <Toaster position="top-right" reverseOrder={false} />
        </SessionWrapper>
      </body>
    </html>
  )
}
