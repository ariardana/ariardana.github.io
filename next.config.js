/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for development to ensure proper CSS loading
  // output: 'export',
  // trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'octocat'
  }
}

module.exports = nextConfig
