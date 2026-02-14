'use client'

import LanguageSwitcher from '@/features/change-language/changeLang'
import Logotype from '@/shared/logotype/logotype'
import NavbarMenu from '@/components/ui/navbarMenu/navbarMenu'
import ContactUs from '@/components/ui/contactUs/ContactUs'
import SwitcherTheme from '@/features/switcher-theme/SwitchTheme'

export default function Header(props: any) {
    return (
        <section
            id="HeaderBar"
            className="grid grid-flow-col w-full h-18.5
        bg-card/70 rounded-2xl text-sm font-bold backdrop-blur-md shadow-md
        font-silkscreen items-center-safe px-9 select-none"
        >
            <Logotype />
            <div className="max-sm:hidden">
                <NavbarMenu />
            </div>
            <div className="grid grid-flow-col gap-3.25 justify-end max-sm:hidden">
                <ContactUs />
                <LanguageSwitcher />
            </div>
            {/* <SwitcherTheme /> */}
        </section>
    )
}
