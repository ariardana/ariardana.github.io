'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, GitFork, Eye, Calendar, Code } from 'lucide-react'
import StaggeredAnimation from '../../app/components/StaggeredAnimation'

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string
  created_at: string
  updated_at: string
  topics: string[]
  fork: boolean
}

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'original' | 'forks'>('all')
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated')

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'octocat'

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        )
        if (!response.ok) {
          throw new Error('Gagal mengambil data repositori')
        }
        const reposData = await response.json()
        setRepos(reposData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  const filteredRepos = repos.filter(repo => {
    if (activeTab === 'original') return !repo.fork
    if (activeTab === 'forks') return repo.fork
    return true
  })

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-500',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-blue-600',
      CSS: 'bg-purple-500',
      HTML: 'bg-orange-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-600',
      PHP: 'bg-indigo-500',
    }
    return colors[language] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="rounded-full h-12 w-12 border-b-2 border-blue-600"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <motion.button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Coba Lagi
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Proyek Saya
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Koleksi repositori dan proyek yang telah saya kerjakan
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              <motion.button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Semua ({repos.length})
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('original')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'original'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Original ({repos.filter(r => !r.fork).length})
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('forks')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'forks'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Forks ({repos.filter(r => r.fork).length})
              </motion.button>
            </div>

            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md transition-all duration-300 text-sm md:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <option value="updated">Terbaru</option>
              <option value="stars">Paling Populer</option>
              <option value="name">Nama A-Z</option>
            </motion.select>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {sortedRepos.length > 0 ? (
          <StaggeredAnimation className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" initialDelay={0.3}>
            {sortedRepos.map((repo) => (
              <motion.div
                key={repo.id}
                className="card p-4 md:p-6 card-hover"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    >
                      <Code size={18} className="text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-semibold truncate">{repo.name}</h3>
                  </div>
                  {repo.fork && (
                    <motion.span 
                      className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }}
                    >
                      Fork
                    </motion.span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm md:text-base">
                  {repo.description || 'Tidak ada deskripsi'}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                    {repo.topics.slice(0, 3).map((topic, idx) => (
                      <motion.span
                        key={topic}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: 0.3,
                          delay: idx * 0.1
                        }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 text-xs md:text-sm text-gray-600 dark:text-gray-300">
                  <motion.div 
                    className="flex items-center space-x-1 transition-all duration-300 hover:text-yellow-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star size={12} className="md:w-3.5 md:h-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-1 transition-all duration-300 hover:text-blue-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <GitFork size={12} className="md:w-3.5 md:h-3.5" />
                    <span>{repo.forks_count}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-1 transition-all duration-300 hover:text-green-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye size={12} className="md:w-3.5 md:h-3.5" />
                    <span>{repo.watchers_count}</span>
                  </motion.div>
                </div>

                {/* Language */}
                {repo.language && (
                  <div className="flex items-center space-x-2 mb-4">
                    <motion.div 
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${getLanguageColor(repo.language)}`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{repo.language}</span>
                  </div>
                )}

                {/* Updated date */}
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar size={10} className="md:w-3 md:h-3" />
                  <span>
                    Diperbarui {new Date(repo.updated_at).toLocaleDateString('id-ID')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 md:space-x-3">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      className="flex-1 flex items-center justify-center space-x-1.5 md:space-x-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium"
                    >
                      <Code size={14} className="md:w-4 md:h-4" />
                      <span>Kode</span>
                    </Link>
                  </motion.div>
                  
                  {repo.homepage && (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={repo.homepage}
                        target="_blank"
                        className="flex-1 flex items-center justify-center space-x-1.5 md:space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-xs md:text-sm font-medium"
                      >
                        <Eye size={14} className="md:w-4 md:h-4" />
                        <span>Demo</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </StaggeredAnimation>
        ) : (
          <motion.div 
            className="text-center py-8 md:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Code size={36} className="mx-auto mb-3 text-gray-400 md:w-12 md:h-12" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Tidak ada repositori</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Tidak ditemukan repositori dengan filter yang dipilih.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}