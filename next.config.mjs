/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/nazwa-repozytorium' : '',
  };
  
  export default nextConfig;