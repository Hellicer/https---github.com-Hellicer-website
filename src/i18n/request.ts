import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const supportedLocales = ['en', 'uk'] as const
type SupportedLocale = (typeof supportedLocales)[number]

function isSupportedLocale(value: string | undefined): value is SupportedLocale {
    return !!value && (supportedLocales as readonly string[]).includes(value)
}

export default getRequestConfig(async () => {
    const cookieLocale = (await cookies()).get('MYNEXTAPP_LOCALE')?.value
    const locale: SupportedLocale = isSupportedLocale(cookieLocale)
        ? cookieLocale
        : 'en'

    return {
        locale,
        messages: (await import(`./translations/${locale}_translation.json`))
            .default,
    }
})
