'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, ExternalLink, MapPin, Calendar, Users, Star, Mail, Code, Copy, Check, Eye, GitFork } from 'lucide-react'
import AnimatedSection from '../app/components/AnimatedSection'
import StaggeredAnimation from '../app/components/StaggeredAnimation'

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

export default function HomePage() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState({ user: true, repos: true })
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'octocat'

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengguna')
        }
        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
      } finally {
        setLoading(prev => ({ ...prev, user: false }))
      }
    }

    async function fetchRepos() {
      try {
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
        setLoading(prev => ({ ...prev, repos: false }))
      }
    }

    fetchUser()
    fetchRepos()
  }, [username])

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

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Gagal menyalin ke clipboard:', err)
    }
  }

  if (loading.user || loading.repos) {
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

  if (!user) return null

  const joinDate = new Date(user.created_at).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 hidden md:block"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="container relative z-10">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 hidden md:block"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.4, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.6
                }}
                className="relative z-10"
              >
                <Image
                  src={user.avatar_url}
                  alt={user.name}
                  width={120}
                  height={120}
                  className="mx-auto rounded-full border-4 border-white dark:border-gray-700 shadow-xl"
                  unoptimized
                />
              </motion.div>
            </div>
            
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {user.name || user.login}
            </motion.h1>
            
            {user.bio && (
              <motion.p 
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {user.bio}
              </motion.p>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={user.html_url} target="_blank" className="btn-primary">
                  <Github className="inline mr-2" size={20} />
                  Lihat Profil GitHub
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <AnimatedSection delay={0}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Proyek Saya
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Koleksi repositori dan proyek yang telah saya kerjakan
              </p>
            </AnimatedSection>
          </div>

          {/* Projects Grid */}
          <StaggeredAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" initialDelay={0.2}>
            {repos.slice(0, 6).map((repo) => (
              <motion.div
                key={repo.id}
                className="card p-4 md:p-6 card-hover"
                whileHover={{ y: -5 }}
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

                {/* Actions */}
                <div className="flex space-x-2 md:space-x-3">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm font-medium"
                    >
                      <Github size={14} className="md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm">Kode</span>
                    </Link>
                  </motion.div>
                  
                  {repo.homepage && (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={repo.homepage}
                        target="_blank"
                        className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg transition-all duration-300 text-sm font-medium"
                      >
                        <ExternalLink size={14} className="md:w-4 md:h-4" />
                        <span className="text-xs md:text-sm">Demo</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </StaggeredAnimation>

          <div className="text-center mt-8 md:mt-12">
            <AnimatedSection delay={0.5}>
              <Link href="/projects" className="btn-secondary">
                Lihat Semua Proyek
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <AnimatedSection delay={0}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Stack
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Teknologi yang saya gunakan dalam pengembangan perangkat lunak
              </p>
            </AnimatedSection>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Languages */}
              <AnimatedSection delay={0.2}>
                <div className="card p-6 md:p-8 h-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                    <Code className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['JavaScript', 'Python', 'TypeScript', 'PHP', 'Golang'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Frontend */}
              <AnimatedSection delay={0.3}>
                <div className="card p-6 md:p-8 h-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                    <Code className="mr-3 text-green-600 dark:text-green-400" size={24} />
                    Frontend
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Next JS', 'Vue.js', 'TailwindCSS'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Backend */}
              <AnimatedSection delay={0.4}>
                <div className="card p-6 md:p-8 h-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                    <Code className="mr-3 text-purple-600 dark:text-purple-400" size={24} />
                    Backend
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['NodeJS', 'Express.js', 'Django', 'Golang'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Databases */}
              <AnimatedSection delay={0.5}>
                <div className="card p-6 md:p-8 h-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                    <Code className="mr-3 text-orange-600 dark:text-orange-400" size={24} />
                    Databases
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['MongoDB', 'Postgres', 'MySQL', 'MariaDB'].map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="text-center mb-12 md:mb-16">
            <AnimatedSection delay={0}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hubungi Saya
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Mari berkolaborasi dan berdiskusi tentang proyek yang menarik
              </p>
            </AnimatedSection>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="card p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Profile Info */}
                  <div className="text-center lg:text-left">
                    <div className="mb-6 relative">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 hidden md:block"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.4, 0.3]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative z-10"
                      >
                        <Image
                          src={user.avatar_url}
                          alt={user.name}
                          width={100}
                          height={100}
                          className="mx-auto lg:mx-0 rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                          unoptimized
                        />
                      </motion.div>
                    </div>
                    
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {user.name || user.login}
                    </motion.h3>
                    
                    {user.bio && (
                      <motion.p 
                        className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 text-base md:text-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {user.bio}
                      </motion.p>
                    )}

                    <motion.div 
                      className="space-y-3 md:space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
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
                    </motion.div>
                  </div>

                  {/* Contact Methods */}
                  <div>
                    <motion.h3 
                      className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center lg:text-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Cara Menghubungi
                    </motion.h3>
                    
                    {/* Let's Connect Message */}
                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-lg md:text-xl font-semibold mb-3">Let's Connect!</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
                        I'm always open to collaboration and discussion about technology. 
                        Feel free to explore my projects or contact me!
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="space-y-4 md:space-y-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {contactMethods.map((method) => {
                        const IconComponent = method.icon
                        return (
                          <motion.div
                            key={method.label}
                            className="flex items-center justify-between p-3 md:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-300"
                            whileHover={{ 
                              y: -3,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
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
                                <motion.button
                                  onClick={() => copyToClipboard(method.value, method.label)}
                                  className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                                  title="Salin"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  {copied === method.label ? (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                    >
                                      <Check size={16} className="text-green-600" />
                                    </motion.div>
                                  ) : (
                                    <Copy size={16} />
                                  )}
                                </motion.button>
                              )}
                              
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Link
                                  href={method.link}
                                  target="_blank"
                                  className="p-1.5 md:p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
                                  title="Buka"
                                >
                                  <ExternalLink size={16} />
                                </Link>
                              </motion.div>
                            </div>
                          </motion.div>
                        )
                      })}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={`mailto:${user.email || `${user.login}@users.noreply.github.com`}`}
                          className="btn-primary w-full"
                        >
                          <Mail className="inline mr-2" size={18} />
                          Kirim Email
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  )
}