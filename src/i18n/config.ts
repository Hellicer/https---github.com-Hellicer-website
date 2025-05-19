import type { Resource } from 'i18next'
import en from './translations/en_translation.json'
import uk from './translations/uk_translation.json'
import { TranslationTypes } from './translations/TranslationTypes'

export const resources: Record<string, { translation: TranslationTypes }> = {
    en: { translation: en },
    uk: { translation: uk },
}

export const defaultNS = 'translation'

export const i18nConfig = {
    resources: resources as Resource,
    fallbackLng: 'en',
    defaultNS,
    interpolation: {
        escapeValue: false,
    },
}
