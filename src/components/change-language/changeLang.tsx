'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { CommonProps } from '@/interfaces/props'
import '@/i18n/clientI18n'

function Button({
    onclick,
    targetLang,
    children,
}: {
    onclick: () => void
    targetLang: string
    children: React.ReactNode
}) {
    return (
        <button
            onClick={onclick}
            className={`max-md:text-lg md:text-[12px] font-extrabold focus:outline-none focus:ring-0  uppercase ${targetLang}`}
        >
            {children}
        </button>
    )
}

export default function LanguageSwitcher(props: CommonProps) {
    const { className } = props
    const { i18n, t } = useTranslation()

    const changeLanguage = async (lang: 'en' | 'uk') => {
        await i18n.changeLanguage(lang)
    }
    return (
        <div className={`outline-none  ${className}`}>
            <Button
                onclick={() => changeLanguage('en')}
                targetLang={
                    String(i18n.language) == 'en'
                        ? 'text-white'
                        : 'text-white/60'
                }
            >
                {t('language.en')}
            </Button>{' '}
            <Button
                onclick={() => changeLanguage('uk')}
                targetLang={
                    String(i18n.language) == 'uk'
                        ? 'text-white'
                        : 'text-white/60'
                }
            >
                {t('language.uk')}
            </Button>
        </div>
    )
}
