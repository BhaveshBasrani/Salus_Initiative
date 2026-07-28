/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/Salus_Initiative' : '',
  assetPrefix: isProd ? '/Salus_Initiative/' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
