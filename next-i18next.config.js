module.exports = {
    i18n: {
        defaultLocale: 'en', // Встановіть вашу мову за замовчуванням
        locales: ['en', 'uk'], // Всі підтримувані мови
        localeDetection: true, // Автоматичне визначення мови браузера
    },
    detection: {
        // Порядок, за яким будуть перевірятися джерела для визначення мови
        order: ['cookie', 'localStorage', 'navigator', 'path'],
        // Де зберігати вибір мови
        caches: ['cookie', 'localStorage'],
    },
}
