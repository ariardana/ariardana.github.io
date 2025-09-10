'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, MapPin, Calendar, Mail, Copy, Check } from 'lucide-react'

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

export default function ContactPage() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

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

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Gagal menyalin ke clipboard:', err)
    }
  }

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

  const contactMethods = [
    {
      icon: Github,
      label: 'GitHub',
      value: user.login,
      link: user.html_url,
      copyable: false,
      color: 'text-gray-800 dark:text-gray-200'
    },
    {
      icon: Mail,
      label: 'Email',
      value: user.email || `${user.login}@users.noreply.github.com`,
      link: `mailto:${user.email || `${user.login}@users.noreply.github.com`}`,
      copyable: true,
      color: 'text-red-600 dark:text-red-400'
    }
  ]

  if (user.blog) {
    contactMethods.push({
      icon: ExternalLink,
      label: 'Website',
      value: user.blog,
      link: user.blog.startsWith('http') ? user.blog : `https://${user.blog}`,
      copyable: true,
      color: 'text-blue-600 dark:text-blue-400'
    })
  }

  if (user.twitter_username) {
    contactMethods.push({
      icon: ExternalLink,
      label: 'Twitter',
      value: `@${user.twitter_username}`,
      link: `https://twitter.com/${user.twitter_username}`,
      copyable: false,
      color: 'text-sky-600 dark:text-sky-400'
    })
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hubungi Saya
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mari berkolaborasi dan berdiskusi tentang proyek yang menarik
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Profile Info */}
              <div className="text-center lg:text-left">
                <div className="mb-6 md:mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse-slow hidden md:block"></div>
                  <Image
                    src={user.avatar_url}
                    alt={user.name}
                    width={120}
                    height={120}
                    className="mx-auto lg:mx-0 rounded-full border-4 border-white dark:border-gray-700 shadow-xl animate-float relative z-10"
                    unoptimized
                  />
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold mb-2">{user.name || user.login}</h2>
                
                {user.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 text-base md:text-lg">
                    {user.bio}
                  </p>
                )}

                <div className="space-y-3 md:space-y-4">
                  {user.location && (
                    <div className="flex items-center justify-center lg:justify-start space-x-2 md:space-x-3">
                      <MapPin className="text-green-600 dark:text-green-400" size={18} />
                      <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">{user.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-2 md:space-x-3">
                    <Calendar className="text-purple-600 dark:text-purple-400" size={18} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                      GitHub member sejak {new Date(user.created_at).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center lg:text-left">
                  Cara Menghubungi
                </h3>
                
                <div className="space-y-4 md:space-y-6">
                  {contactMethods.map((method, index) => {
                    const IconComponent = method.icon
                    return (
                      <div
                        key={method.label}
                        className="flex items-center justify-between p-3 md:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-800 rounded-full">
                            <IconComponent className={method.color} size={18} />
                          </div>
                          <div>
                            <p className="font-medium text-sm md:text-base">{method.label}</p>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 break-all">
                              {method.value}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1 md:space-x-2">
                          {method.copyable && (
                            <button
                              onClick={() => copyToClipboard(method.value, method.label)}
                              className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                              title="Salin"
                            >
                              {copied === method.label ? (
                                <Check size={16} className="text-green-600" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                          )}
                          
                          <Link
                            href={method.link}
                            target="_blank"
                            className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                            title="Buka"
                          >
                            <ExternalLink size={16} />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-6 md:mt-8">
                  <Link
                    href={`mailto:${user.email || `${user.login}@users.noreply.github.com`}`}
                    className="btn-primary w-full flex items-center justify-center text-sm md:text-base"
                  >
                    <Mail className="inline mr-2" size={18} />
                    Kirim Email Langsung
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}