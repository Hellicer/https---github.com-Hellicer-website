'use client'

import { useTranslation } from 'react-i18next'

export default function navbarMenu(props: any) {
    const { t } = useTranslation()
    return (
        <div className="grid grid-flow-col w-[450px] ">
            <span>{t?.('header.about') ?? 'loren ipsum'} </span>
            <span>{t?.('header.specialization') ?? 'loren ipsum'} </span>{' '}
            <span>{t?.('header.skills') ?? 'loren ipsum'} </span>{' '}
            <span>{t?.('header.projects') ?? 'loren ipsum'} </span>{' '}
        </div>
    )
}
