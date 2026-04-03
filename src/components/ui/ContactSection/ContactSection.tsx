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
        <section className="w-full px-4 sm:px-6 lg:px-8 text-white" id="contact">
            <div className="max-w-[1400px] mx-auto">
                {/* Title */}
                <h2 className="font-silkscreen text-2xl sm:text-3xl font-bold tracking-widest uppercase mb-8 sm:mb-12">
                    Contact us
                </h2>

                {/* Content */}
                <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12">
                    {/* Left Side */}
                    <div className="space-y-6 sm:space-y-8 text-sm sm:text-base lg:text-lg">
                        {/* Telegram / WhatsApp */}
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
                            <span className="underline underline-offset-4">
                                Let&apos;s chat on telegram:
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
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
                            <span className="underline underline-offset-4">
                                E-mail:
                            </span>

                            <Link
                                href="mailto:manager@logotypeweb.studio"
                                className="underline underline-offset-4 hover:opacity-70 break-all"
                            >
                                manager@logotypeweb.studio
                            </Link>

                            {/* Copy icon */}
                            <button className="hover:opacity-70 w-fit">
                                <MdOutlineContentCopy className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg self-start md:self-end">
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
