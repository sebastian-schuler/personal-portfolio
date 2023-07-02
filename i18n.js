module.exports = {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    pages: {
        '*': ['common'],
        '/': ['index'],
        "rgx:/(blog)": ["blog"],
        "rgx:/(portfolio)": ["portfolio"],
        "/contact": ["contact"],
        "/legal-notice": ["legal-notice"],
    },
    defaultNS: 'common',
}