import Main from '@/components/layout/Main/page'
import HeaderShell from '@/components/layout/Header/HeaderShell'
import ContactSection from '@/components/ui/ContactSection/ContactSection'

export default function Home() {
    return (
        <div className="flex flex-col overflow-x-hidden">
            <HeaderShell />
            <Main />
            <footer className="mt-40 relative grid max-w-360 w-full place-self-center z-10 justify-items-center items-stretch p-4 gap-16">
                <ContactSection />
            </footer>
        </div>
    )
}
