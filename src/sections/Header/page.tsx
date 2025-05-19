'use client'

import LanguageSwitcher from '@/components/change-language/changeLang'

export function Header({ children }: { children: any }) {
    return (
        <div className="grid grid-flow-col">
            <LanguageSwitcher />
            {/* </changeLanguage> */}
        </div>
    )
}
