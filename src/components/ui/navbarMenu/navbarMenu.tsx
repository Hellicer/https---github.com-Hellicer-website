'use client'

import { useTranslations } from 'next-intl'

const arrMenuItems = [
    'about',
    'specialization',
    'skills',
    'projects',
    'contact',
]
export default function navbarMenu(props: any) {
    const t = useTranslations('header')
    return (
        <div className="grid grid-flow-col w-[450px] place-items-center justify-self-center ">
            {arrMenuItems.map(item => (
                <button type="button" key={item} className="cursor-pointer">
                    {t?.(`${item}`) ?? 'item'}
                </button>
            ))}
        </div>
    )
}
