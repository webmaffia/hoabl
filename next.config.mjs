/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  output: 'standalone',
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
