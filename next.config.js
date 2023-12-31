/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["graphql-request"],
    serverActions: true,
  },
};

module.exports = nextConfig;
