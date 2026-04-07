import { ProjectStack, ProjectStatus } from '@prisma/client'

export interface CommonProps {
    t?: (key: string) => string
    className?: string
    toggle?: () => void
    isOpen?: boolean
    name?: string
    i?: string | number
    closeMenu?: () => void
}

export type FiltersState = {
    stack: ProjectStack | null
    status: ProjectStatus | null
    tech: string[]
}
