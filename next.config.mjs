const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? '/lcy-aliens' : '',
  assetPrefix: isProd ? '/lcy-aliens/' : ''
};

export default nextConfig;
