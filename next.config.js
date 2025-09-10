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
  },
  // Disable x-powered-by header to reduce information exposure
  poweredByHeader: false,
  // Explicitly set the distDir to avoid conflicts
  distDir: '.next',
}

module.exports = nextConfig
