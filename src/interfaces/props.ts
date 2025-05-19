import { TFunction } from 'i18next'

export interface CommonProps {
    t?: TFunction
    className?: string
    toggle?: () => void
    isOpen?: boolean
    name?: string
    i?: string | number
    closeMenu?: () => void
}
