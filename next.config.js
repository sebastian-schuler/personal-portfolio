/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  // experimental: { appDir: true }
  // async redirects() {
  //   return [
  //     {
  //       source: '/blog',
  //       destination: '/blog/1',
  //       permanent: true,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
