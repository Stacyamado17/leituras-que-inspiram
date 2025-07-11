import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Leituras que Inspiram',
  description: 'Created by Stacy Amado',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
