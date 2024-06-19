/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  };
  
  export default nextConfig;