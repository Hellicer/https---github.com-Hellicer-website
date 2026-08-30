// import '../swiper.css'

import Main from '@/components/layout/Main/page'
import HeaderShell from '@/components/layout/Header/HeaderShell'
import ContactSection from '@/components/ui/ContactSection/ContactSection'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

const HOME_MESSAGE_KEYS = [
    'language',
    'header',
    'headerTitle',
    'subHeaderTitle',
    'sideSwitcherLeft',
    'sideSwitcherRight',
    'specialization',
    'about',
    'project',
    'profileCard',
    'profile',
    'contact',
    'contactSection',
    'common',
] as const

function pickHomeMessages(
    messages: Record<string, unknown>,
): Record<string, unknown> {
    return Object.fromEntries(
        HOME_MESSAGE_KEYS.filter(key => key in messages).map(key => [
            key,
            messages[key],
        ]),
    )
}

export default async function Home() {
    const locale = await getLocale()
    const allMessages = (await getMessages()) as Record<string, unknown>
    const homeMessages = pickHomeMessages(allMessages)

    return (
        <NextIntlClientProvider locale={locale} messages={homeMessages}>
            <div className="flex flex-col overflow-x-hidden">
                <HeaderShell />
                <Main />
                <footer className="mt-40 relative grid max-w-360 w-full place-self-center z-10 justify-items-center items-stretch p-4 gap-16">
                    <ContactSection />
                </footer>
            </div>
        </NextIntlClientProvider>
    )
}
