'use client'

import { useTranslations } from 'next-intl'

export default function ContactUs(props: any) {
    const t = useTranslations('header')

    return (
        <>
            <button> {t?.('contact') ?? 'loren ipsum'}</button>
        </>
    )
}
