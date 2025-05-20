'use client'

import LanguageSwitcher from '@/components/change-language/changeLang'
import Logotype from '@/components/logotype/logotype'
import NavbarMenu from '@/components/navbarMenu/navbarMenu'
import ContactUs from '@/components/contactUs/ContactUs'
import SwitcherTheme from '@/components/switcher-theme/SwitchTheme'

export function Header(props: any) {
    return (
        <section
            id="HeaderBar"
            className="grid grid-flow-col w-full h-[74px]
        bg-accent rounded-2xl text-sm font-bold
        font-silkscreen items-center-safe place-items-center"
        >
            <Logotype />
            <NavbarMenu />
            <LanguageSwitcher />
            <ContactUs />
            <SwitcherTheme />
        </section>
    )
}
