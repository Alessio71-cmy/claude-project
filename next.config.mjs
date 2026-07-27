/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export statico: l'app non ha backend, database né route handler.
  // Il contenuto arriva da JSON committati, quindi tutto è prerenderizzabile.
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
