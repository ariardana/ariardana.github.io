'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { ThemeProvider } from './components/ThemeProvider'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeProvider>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card p-8 max-w-md w-full text-center">
              <div className="mb-6">
                <Github size={48} className="mx-auto text-red-500" />
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan</h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Maaf, terjadi kesalahan saat memuat halaman. Kami telah mencatat kesalahan ini dan akan memperbaikinya.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => reset()}
                  className="btn-primary"
                >
                  Coba Lagi
                </button>
                
                <Link href="/" className="btn-secondary">
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}