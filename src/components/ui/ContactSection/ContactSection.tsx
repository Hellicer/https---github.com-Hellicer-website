import Link from 'next/link'
import {
    InstagramLogoIcon,
    LinkedInLogoIcon,
    GitHubLogoIcon,
} from '@radix-ui/react-icons'
import { PiTelegramLogo } from 'react-icons/pi'
import { FaWhatsapp } from 'react-icons/fa'
import { MdOutlineContentCopy } from 'react-icons/md'
import { FaFigma } from 'react-icons/fa'

export default function ContactSection() {
    return (
        <section className="w-full  text-white ">
            <div className="max-w-[1400px] mx-auto ">
                {/* Title */}
                <h2 className="font-silkscreen text-3xl font-bold tracking-widest uppercase mb-12">
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
                                <PiTelegramLogo className="w-6 h-6" />
                            </Link>

                            <span className="underline underline-offset-4">
                                or whatsapp:
                            </span>

                            <Link href="#" className="hover:opacity-70">
                                <FaWhatsapp className="w-6 h-6" />
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
                            <button className="hover:opacity-70">
                                <MdOutlineContentCopy className="w-6 h-6" />
                            </button>
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
                            <GitHubLogoIcon className="w-6 h-6" />
                        </Link>

                        <Link href="#" className="hover:opacity-70">
                            <LinkedInLogoIcon className="w-6 h-6" />
                        </Link>
                        <Link href="#" className="hover:opacity-70">
                            <FaFigma className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
