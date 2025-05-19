import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './translations/en_translation.json'
import uk from './translations/uk_translation.json'
import { TranslationTypes } from './translations/TranslationTypes'

const resources: Record<string, { translation: TranslationTypes }> = {
    en: { translation: en },
    uk: { translation: uk },
}

// Не використовувати детектор мови під час SSR
const isServer = typeof window === 'undefined'

const i18nInstance = i18n.createInstance()

if (!isServer) {
    // Код виконується тільки на клієнті
    i18nInstance.use(LanguageDetector)
}

i18nInstance.use(initReactI18next).init({
    resources,
    detection: !isServer
        ? {
              order: ['localStorage', 'navigator'],
              caches: ['localStorage'],
              lookupLocalStorage: 'i18nextLng',
          }
        : undefined,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
})

export default i18nInstance
