/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME || 'octocat'
  }
}

module.exports = nextConfig
