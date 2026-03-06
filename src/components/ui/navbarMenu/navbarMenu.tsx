'use client'

import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const arrMenuItems = [
    'about',
    'specialization',
    'skills',
    'projects',
    'contact',
]
type NavbarMenuProps = {
    className?: string
    itemClassName?: string
    onItemClick?: () => void
}

export default function NavbarMenu({
    className,
    itemClassName,
    onItemClick,
}: NavbarMenuProps) {
    const t = useTranslations('header')
    return (
        <div
            className={cn(
                'grid grid-flow-col max-w-5xl gap-10 place-items-center justify-self-center',
                className,
            )}
        >
            {arrMenuItems.map(item => (
                <a
                    href={`#${item}`}
                    id={`block-${item}`}
                    key={item}
                    onClick={onItemClick}
                    className={cn('cursor-pointer', itemClassName)}
                >
                    {t?.(`${item}`) ?? 'item'}
                </a>
            ))}
        </div>
    )
}
