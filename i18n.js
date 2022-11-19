module.exports = {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    pages: {
        '*': ['common'],
        '/': ['index'],
        "rgx:/(blog)": ["blog"],
    },
    defaultNS: 'common',
}