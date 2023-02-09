module.exports = {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    pages: {
        '*': ['common'],
        '/': ['index'],
        "rgx:/(blog)": ["blog"],
        "rgx:/(portfolio)": ["portfolio"],
        "/contact": ["contact"],
    },
    defaultNS: 'common',
}