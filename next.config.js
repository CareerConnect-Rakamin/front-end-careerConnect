const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL
  },
  rewrites: [
    {
      source: '/api/v1/:path*',
      destination: 'http://localhost:3000/api/v1/:path*'
    }
  ]
};

module.exports = nextConfig;
