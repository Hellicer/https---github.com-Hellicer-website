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
        font-silkscreen items-center-safe px-[36px] select-none"
        >
            <Logotype />
            <NavbarMenu />
            <div className="grid grid-flow-col gap-[13px] justify-around">
                <ContactUs />
                <LanguageSwitcher />
            </div>
            {/* <SwitcherTheme /> */}
        </section>
    )
}
