'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { CommonProps } from '@/interfaces/props'
import { useRouter } from 'next/navigation'

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
            className={`max-md:text-sm font-extrabold cursor-pointer focus:outline-none focus:ring-0  uppercase ${targetLang}`}
        >
            {children}
        </button>
    )
}

export default function LanguageSwitcher(props: CommonProps) {
    const { className } = props
    const t = useTranslations('language')
    const router = useRouter()

    const [locale, setLocale] = useState('')

    useEffect(() => {
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('MYNEXTAPP_LOCALE='))
            ?.split('=')[1]

        // console.log(cookieLocale)
        if (cookieLocale) {
            setLocale(cookieLocale)
        } else {
            const browserLocale = navigator.language.slice(0, 2)
            setLocale(browserLocale)
            document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`
            router.refresh()
        }
    }, [router])

    const changeLocale = (newLocale: string) => {
        // console.log(newLocale)
        setLocale(newLocale)
        document.cookie = `MYNEXTAPP_LOCALE=${newLocale}`
        router.refresh()
    }
    return (
        <div className={`outline-none  ${className}`}>
            <Button
                onclick={() => changeLocale('en')}
                targetLang={locale == 'en' ? 'text-white' : 'text-white/60'}
            >
                {t('en')}
            </Button>{' '}
            <Button
                onclick={() => changeLocale('uk')}
                targetLang={locale == 'uk' ? 'text-white' : 'text-white/60'}
            >
                {t('uk')}
            </Button>
        </div>
    )
}
