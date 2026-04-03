'use client'

import { profileData } from '../../../data/UserData'
import { RadarSimple } from './RadarSkills'
import { CommonProps } from '@/interfaces/props'
import { SLUGS as skills } from '@/data/slugs'
import { Button } from '../button'
// import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/effect-cards'
// import { UIIcon } from '../ui-icon'
// import MemoryDownload from '../../../../public/memoryDownload.svg'

function SkillIcon({ skill }: { skill: string }) {
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
    const src = `https://cdn.simpleicons.org/${skill}/${skill}`

    useEffect(() => {
        let isMounted = true
        const image = new Image()

        image.onload = () => {
            if (isMounted) setIsAvailable(true)
        }
        image.onerror = () => {
            if (isMounted) setIsAvailable(false)
        }
        image.src = src

        return () => {
            isMounted = false
        }
    }, [src])

    if (isAvailable !== true) return null

    return (
        <img
            className="mr-2"
            src={src}
            width={16}
            height={16}
            loading="lazy"
            decoding="async"
            alt={`${skill} logo`}
        />
    )
}

export function SkillTiles() {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [hasOverflow, setHasOverflow] = useState(false)

    useEffect(() => {
        let frameId1 = 0
        let frameId2 = 0

        const checkOverflow = () => {
            const wrapper = wrapperRef.current
            const content = contentRef.current

            if (!wrapper || !content) {
                setHasOverflow(false)
                return
            }

            const verticalOverflow = content.scrollHeight - wrapper.clientHeight
            const horizontalOverflow = content.scrollWidth - wrapper.clientWidth

            setHasOverflow(verticalOverflow > 1 || horizontalOverflow > 1)
        }

        const scheduleCheck = () => {
            cancelAnimationFrame(frameId1)
            cancelAnimationFrame(frameId2)
            frameId1 = requestAnimationFrame(() => {
                checkOverflow()
                frameId2 = requestAnimationFrame(checkOverflow)
            })
        }

        scheduleCheck()

        const resizeObserver = new ResizeObserver(scheduleCheck)
        if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)
        if (contentRef.current) resizeObserver.observe(contentRef.current)

        const mutationObserver = new MutationObserver(scheduleCheck)
        if (contentRef.current) {
            mutationObserver.observe(contentRef.current, {
                childList: true,
                subtree: true,
                characterData: true,
            })
        }

        window.addEventListener('resize', scheduleCheck)

        return () => {
            cancelAnimationFrame(frameId1)
            cancelAnimationFrame(frameId2)
            resizeObserver.disconnect()
            mutationObserver.disconnect()
            window.removeEventListener('resize', scheduleCheck)
        }
    }, [])

    return (
        <div
            className="relative h-[210px] overflow-hidden min-[581px]:h-[243px]"
            ref={wrapperRef}
        >
            <div className="flex flex-wrap gap-2 pl-2 pt-1" ref={contentRef}>
                {skills.map(skill => (
                    <div
                        key={skill}
                        className={`
            bg-accent
            px-3 py-1
            rounded-md
            text-xs font-semibold
            flex items-center
            shadow-md
            h-8
            // hover:scale-105 transition
          `}
                    >
                        <SkillIcon skill={skill} />
                        <p className="capitalize">{skill}</p>
                    </div>
                ))}
            </div>
            {hasOverflow && (
                <div className="pointer-events-none absolute right-2 bottom-2 min-[581px]:right-22">
                    <span className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-xs font-semibold tracking-widest">
                        ...
                    </span>
                </div>
            )}
        </div>
    )
}

const TitleBar = ({ title }: { title: string }) => (
    <p className="text-ring h-fit font-silkscreen text-base font-semibold sm:text-lg lg:text-xl">
        $: cd ./${title}
    </p>
)
export function ProfileCard({ className }: CommonProps = {}) {
    const d = profileData
    const t = useTranslations('')
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)')
        const updateDesktopState = () => {
            setIsDesktop(mediaQuery.matches)
        }

        updateDesktopState()
        mediaQuery.addEventListener('change', updateDesktopState)

        return () =>
            mediaQuery.removeEventListener('change', updateDesktopState)
    }, [])

    const profileCardContent = (
        <div className="grid min-h-[860px] min-w-0 gap-6 rounded-2xl bg-card p-4 text-sm transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 min-[581px]:min-h-[954px]">
            {/* MAIN INFO */}
            <div className="grid min-w-0 gap-6 min-[581px]:grid-cols-[minmax(0,1fr)_auto]">
                <div className="order-1 min-w-0 font-inter text-base font-semibold min-[581px]:col-start-1 min-[581px]:row-start-1">
                    <TitleBar title="main info" />
                    <div className="pl-2 pt-1">
                        <p>
                            <span className="text-chart-1">&gt; Name: </span>
                            {d.mainInfo.name}
                        </p>
                        <p>
                            <span className="text-chart-1">
                                &gt; Position:{' '}
                            </span>
                            {d.mainInfo.position}
                        </p>
                        <p>
                            <span className="text-chart-1">&gt; Sex: </span>
                            {d.mainInfo.sex}
                        </p>
                        <p>
                            <span className="text-chart-1">&gt; Old: </span>
                            {d.mainInfo.age}
                        </p>
                    </div>
                </div>

                {/* AVATAR */}
                <div className="order-2 grid min-w-0 content-start gap-4 min-[581px]:col-start-2 min-[581px]:row-span-2 min-[581px]:row-start-1 min-[581px]:grid-cols-1">
                    <div className="flex h-32 w-32 max-[580px]:h-48 max-[580px]:w-full items-center justify-center rounded-xl bg-gray-500/40 min-[581px]:h-50 min-[581px]:w-50">
                        <span>Photo</span>
                    </div>

                    <div className="flex w-full min-w-0 flex-col gap-2 min-[581px]:max-w-50">
                        <Button
                            variant="secondary"
                            asChild
                            size="default"
                            className="pointer-events-auto h-9 p-0 text-sm sm:text-base"
                        >
                            <a href={'#'} className="">
                                <span className="capitalize">
                                    {t('common.download')} CV
                                </span>
                            </a>
                        </Button>

                        <div className="flex flex-wrap gap-2">
                            <div className="text-card-foreground mt-1 flex text-xs pointer-events-cursor">
                                <a
                                    className="bg-gray-600 flex py-1 px-1 rounded-l-sm"
                                    href="#"
                                >
                                    <img
                                        className="me-1"
                                        src={`https://cdn.simpleicons.org/wakatime/wakatime`}
                                        width={14}
                                        height={14}
                                        loading="lazy"
                                        decoding="async"
                                        alt="Wakatime logo"
                                    />
                                    wakatime
                                </a>
                                <div className="bg-[#0778b9] py-1  px-1 rounded-r-sm">
                                    {d.wakatime.text}
                                </div>
                            </div>

                            <a href={d.social.linkedin}>
                                <LinkedInLogoIcon
                                    className="ms-1 h-6 w-6 text-white"
                                    aria-label="LinkedIn icon"
                                />
                            </a>
                            <a href={d.social.github}>
                                <GitHubLogoIcon
                                    className="ms-1 h-6 w-6 text-white"
                                    aria-label="GitHub icon"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div className="order-3 min-[581px]:col-start-1 min-[581px]:row-start-2">
                    <TitleBar title="skills" />

                    <div className="pl-2 pt-1">
                        {d.skills.map(s => (
                            <p
                                className="font-inter text-base font-semibold"
                                key={s}
                            >
                                {s}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* TECH STACK */}
            <div>
                <div className="pb-2.5">
                    <TitleBar title="tech stack" />
                </div>

                <SkillTiles />
            </div>

            {/* BOTTOM */}
            <div className="grid min-w-0 grid-cols-1 gap-6 min-[581px]:grid-cols-2">
                <div className="grid grid-flow-row">
                    <TitleBar title="Other Info" />

                    <RadarSimple {...d.radar} />
                </div>

                <div className="grid min-w-0 content-start">
                    <TitleBar title="projects" />
                    <div className="letter-spacing-wide grid grid-flow-row space-y-3 py-3 pt-4 pl-2 font-inter text-sm font-semibold sm:pt-6 sm:text-base">
                        <a href="#" className="underline">
                            &gt; Open-source:{' '}
                            <span>{d.projects.openSource}</span>
                        </a>
                        <a href="#" className="underline">
                            &gt; Startups: <span>{d.projects.startups}</span>
                        </a>
                        <a href="#" className="underline">
                            &gt; Freelance: <span>{d.projects.freelance}</span>
                        </a>
                        <a href="#" className="underline">
                            &gt; Corporate: <span>{d.projects.corporate}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

    const comingSoonContent = (
        <div className="grid min-h-[860px] min-w-0 place-items-center rounded-2xl bg-card p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] min-[581px]:min-h-[954px]">
            <div className="grid gap-4">
                <p className="rounded-full border border-ring/40 bg-card/70 px-4 py-3 font-silkscreen text-2xl tracking-widest text-ring uppercase shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:px-6 sm:text-3xl">
                    coming soon
                </p>
                <p className="text-sm text-muted-foreground font-semibold">
                    The next profile card is in progress.
                </p>
            </div>
        </div>
    )

    return (
        <div
            className={`group w-full min-w-0 max-w-xl [perspective:1000px] ${className}`}
        >
            {isDesktop ? (
                <Swiper
                    effect="cards"
                    grabCursor
                    autoHeight
                    modules={[EffectCards]}
                    className="w-full min-w-0"
                >
                    <SwiperSlide className="min-w-0">
                        {profileCardContent}
                    </SwiperSlide>
                    <SwiperSlide className="min-w-0">
                        {comingSoonContent}
                    </SwiperSlide>
                </Swiper>
            ) : (
                profileCardContent
            )}
        </div>
    )
}
