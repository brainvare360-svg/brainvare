/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  distDir: 'out',
  
  // Images from external domains
  images: {
    unoptimized: true,
  },

  // Trailing slash for compatibility
  trailingSlash: false,

  reactStrictMode: true,

  // Disable automatic pages directory detection
  // Our src/pages/ is NOT Next.js pages router
  useFileSystemPublicRoutes: true,
}

export default nextConfig
