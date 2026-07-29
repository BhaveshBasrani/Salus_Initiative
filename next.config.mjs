/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/Salus_Initiative' : '');

const nextConfig = {
  output: 'export',
  basePath: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;

