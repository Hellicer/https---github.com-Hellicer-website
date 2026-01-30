import Link from 'next/link'
import {
    InstagramLogoIcon,
    LinkedInLogoIcon,
    GitHubLogoIcon,
} from '@radix-ui/react-icons'
import { TableCellsMerge } from 'lucide-react'

export default function ContactSection() {
    return (
        <section className="w-full bg-black text-white py-20">
            <div className="max-w-[1400px] mx-auto px-8">
                {/* Title */}
                <h2 className="font-pixel text-3xl tracking-widest uppercase mb-12">
                    Contact us
                </h2>

                {/* Content */}
                <div className="flex flex-col md:flex-row justify-between gap-12">
                    {/* Left Side */}
                    <div className="space-y-8 text-lg">
                        {/* Telegram / WhatsApp */}
                        <div className="flex items-center gap-3">
                            <span className="underline underline-offset-4">
                                Let’s chat on telegram:
                            </span>

                            <Link href="#" className="hover:opacity-70">
                                <TableCellsMerge className="w-6 h-6" />
                            </Link>

                            <span className="underline underline-offset-4">
                                or whatsapp:
                            </span>

                            <Link href="#" className="hover:opacity-70">
                                <span className="text-xl">💬</span>
                            </Link>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3">
                            <span className="underline underline-offset-4">
                                E-mail:
                            </span>

                            <Link
                                href="mailto:manager@logotypeweb.studio"
                                className="underline underline-offset-4 hover:opacity-70"
                            >
                                manager@logotypeweb.studio
                            </Link>

                            {/* Copy icon */}
                            <button className="hover:opacity-70">📋</button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4 text-lg">
                        <span className="underline underline-offset-4">
                            Other link:
                        </span>

                        <Link href="#" className="hover:opacity-70">
                            <InstagramLogoIcon className="w-6 h-6" />
                        </Link>

                        <Link href="#" className="hover:opacity-70">
                            🌐
                        </Link>

                        <Link href="#" className="hover:opacity-70">
                            <GitHubLogoIcon className="w-6 h-6" />
                        </Link>

                        <Link href="#" className="hover:opacity-70">
                            ✦
                        </Link>

                        <Link href="#" className="hover:opacity-70">
                            <LinkedInLogoIcon className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
