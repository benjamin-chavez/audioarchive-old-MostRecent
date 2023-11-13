/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  poweredByHeader: false,
  reactStrictMode: true,
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: '/api/auth/:path*',
  //         destination: '/api/auth/:path*', // This ensures the path is not rewritten
  //       },
  //       // {
  //       //   source: '/api/:path*',
  //       //   destination: 'http://localhost:5000/api/:path*',
  //       //   // source: '/api(\\?!/auth/)/:path*',
  //       //   // destination: 'http://localhost:5000/api/:path*',
  //       // },
  //     ],
  //   };
  // },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
