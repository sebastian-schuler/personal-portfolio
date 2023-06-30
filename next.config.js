/** @type {import('next').NextConfig} */

const nextTranslate = require("next-translate-plugin");

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    localeDetection: true,
  },
}

module.exports = nextTranslate(nextConfig);
