module.exports = {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    pages: {
        '*': ['common'],
        '/': ['index'],
        "rgx:/(blog)": ["blog"],
        "rgx:/(projects)": ["projects"],
    },
    defaultNS: 'common',
}