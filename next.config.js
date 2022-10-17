/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: { webpack5: true },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
