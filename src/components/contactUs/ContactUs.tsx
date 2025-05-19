'use client'

import { useTranslation } from 'react-i18next'

export default function ContactUs(props: any) {
    const { t } = useTranslation()

    return (
        <>
            <button> {t?.('header.contact') ?? 'loren ipsum'}</button>
        </>
    )
}
