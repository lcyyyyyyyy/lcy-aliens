const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? '/lcy-aliens' : '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

export default nextConfig;
