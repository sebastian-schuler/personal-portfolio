module.exports = {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    pages: {
        '*': ['common'],
        '/': ['index'],
        "rgx:/(blog)": ["blog"],
        "rgx:/(projects)": ["projects"],
        "/contact": ["contact"],
    },
    defaultNS: 'common',
}