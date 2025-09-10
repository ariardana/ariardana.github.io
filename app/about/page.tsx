'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, MapPin, Calendar, Users, Code, ExternalLink } from 'lucide-react'

interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  html_url: string
  location: string
  created_at: string
  public_repos: number
  followers: number
  following: number
  email: string
  blog: string
  twitter_username: string
}

export default function AboutPage() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'octocat'

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna')
        }
        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  if (!user) return null

  const joinDate = new Date(user.created_at).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tentang Saya
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pelajari lebih lanjut tentang siapa saya dan perjalanan saya di dunia teknologi
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Profile Info */}
              <div className="text-center md:text-left">
                <div className="mb-6 md:mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse-slow hidden md:block"></div>
                  <Image
                    src={user.avatar_url}
                    alt={user.name}
                    width={150}
                    height={150}
                    className="mx-auto md:mx-0 rounded-full border-4 border-white dark:border-gray-700 shadow-xl animate-float relative z-10"
                    unoptimized
                  />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{user.name || user.login}</h2>
                
                {user.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 text-base md:text-lg">
                    {user.bio}
                  </p>
                )}

                <div className="space-y-3 md:space-y-4">
                  {user.location && (
                    <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3">
                      <MapPin className="text-green-600 dark:text-green-400" size={18} />
                      <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{user.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3">
                    <Calendar className="text-purple-600 dark:text-purple-400" size={18} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                      Bergabung sejak {joinDate}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3">
                    <Users className="text-blue-600 dark:text-blue-400" size={18} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                      {user.followers} pengikut · {user.following} mengikuti
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats and Links */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Statistik GitHub</h3>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="card p-3 md:p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">{user.public_repos}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Repositori</div>
                  </div>
                  
                  <div className="card p-3 md:p-4 text-center">
                    <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">{user.followers}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Pengikut</div>
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Tautan</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <Link 
                    href={user.html_url} 
                    target="_blank"
                    className="flex items-center space-x-3 p-3 md:p-4 card transition-all duration-300"
                  >
                    <Github className="text-gray-800 dark:text-gray-200" size={20} />
                    <div>
                      <div className="font-medium text-sm md:text-base">Profil GitHub</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{user.login}</div>
                    </div>
                    <ExternalLink size={14} className="ml-auto text-gray-400" />
                  </Link>
                  
                  {user.blog && (
                    <Link 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                      target="_blank"
                      className="flex items-center space-x-3 p-3 md:p-4 card transition-all duration-300"
                    >
                      <ExternalLink className="text-blue-600 dark:text-blue-400" size={20} />
                      <div>
                        <div className="font-medium text-sm md:text-base">Website</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 break-all">{user.blog}</div>
                      </div>
                      <ExternalLink size={14} className="ml-auto text-gray-400" />
                    </Link>
                  )}
                  
                  {user.twitter_username && (
                    <Link 
                      href={`https://twitter.com/${user.twitter_username}`} 
                      target="_blank"
                      className="flex items-center space-x-3 p-3 md:p-4 card transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600 dark:text-sky-400">
                        <path d="M4 4l11.733 16h4.267l-11.733-16z"></path>
                        <path d="M4 20L20 4"></path>
                      </svg>
                      <div>
                        <div className="font-medium text-sm md:text-base">Twitter</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">@{user.twitter_username}</div>
                      </div>
                      <ExternalLink size={14} className="ml-auto text-gray-400" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Tentang Portfolio Ini</h3>
              <div className="prose max-w-none dark:prose-invert">
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm md:text-base">
                  Portfolio ini dibangun dengan Next.js dan terintegrasi langsung dengan GitHub API untuk menampilkan 
                  proyek-proyek dan statistik pengguna secara real-time. Dengan desain modern dan responsif, 
                  portfolio ini memberikan pengalaman terbaik di berbagai perangkat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}