'use client'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { i18nConfig } from './config'

const i18nInstance = i18n.createInstance()

i18nInstance
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ...i18nConfig,
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
    })

export default i18nInstance
