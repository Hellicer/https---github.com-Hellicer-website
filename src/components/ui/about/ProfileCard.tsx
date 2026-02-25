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
import 'swiper/css'
import 'swiper/css/effect-cards'
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
        const checkOverflow = () => {
            if (!wrapperRef.current || !contentRef.current) {
                setHasOverflow(false)
                return
            }

            setHasOverflow(
                contentRef.current.scrollHeight >
                    wrapperRef.current.clientHeight,
            )
        }

        checkOverflow()

        const observer = new ResizeObserver(checkOverflow)
        if (wrapperRef.current) observer.observe(wrapperRef.current)
        if (contentRef.current) observer.observe(contentRef.current)

        return () => observer.disconnect()
    }, [])

    return (
        <div className="relative h-[243px] overflow-hidden" ref={wrapperRef}>
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
                <div className="pointer-events-none absolute bottom-2 right-22">
                    <span className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-xs font-semibold tracking-widest">
                        ...
                    </span>
                </div>
            )}
        </div>
    )
}

const TitleBar = ({ title }: { title: string }) => (
    <p className="text-ring font-semibold text-xl font-silkscreen h-fit">
        $: cd ./${title}
    </p>
)
export function ProfileCard({ className }: CommonProps = {}) {
    const d = profileData
    const t = useTranslations('')

    return (
        <div
            className={`group [perspective:1000px] max-w-xl w-full ${className}`}
        >
            <Swiper
                effect="cards"
                grabCursor
                autoHeight
                modules={[EffectCards]}
                className="w-full"
            >
                <SwiperSlide>
                    <div className="grid h-[954px] rounded-2xl bg-card p-6 transition-transform duration-500 text-sm space-y-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] ">
                        {/* MAIN INFO */}
                        <div className="grid grid-flow-col gap-6">
                            <div className="grid grid-flow-row gap-6">
                                <div className="font-inter text-base font-semibold">
                                    <TitleBar title="main info" />
                                    <div className="pl-2 pt-1">
                                        <p>
                                            <span className="text-chart-1">
                                                &gt; Name:{' '}
                                            </span>
                                            {d.mainInfo.name}
                                        </p>
                                        <p>
                                            <span className="text-chart-1">
                                                &gt; Position:{' '}
                                            </span>
                                            {d.mainInfo.position}
                                        </p>
                                        <p>
                                            <span className="text-chart-1">
                                                &gt; Sex:{' '}
                                            </span>
                                            {d.mainInfo.sex}
                                        </p>
                                        <p>
                                            <span className="text-chart-1">
                                                &gt; Old:{' '}
                                            </span>
                                            {d.mainInfo.age}
                                        </p>
                                    </div>
                                </div>
                                {/* SKILLS */}
                                <div>
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

                            {/* AVATAR */}
                            <div className="gap-4 grid grid-flow-row content-start">
                                <div className="w-50 h-50 rounded-xl bg-gray-500/40 flex items-center justify-center">
                                    <span>Photo</span>
                                </div>

                                <div className="flex flex-col w-full max-w-50 gap-2">
                                    <Button
                                        variant="secondary"
                                        asChild
                                        size="default"
                                        className="pointer-events-auto p-0 h-9 text-base"
                                    >
                                        <a href={'#'} className="">
                                            {/* {cta} */}
                                            <span className="capitalize">
                                                {t('common.download')} CV
                                            </span>
                                            {/* <MemoryDownload
                                    style={{ width: 18, height: 18 }}
                                    className="mt-0.5 text-white "
                                /> */}
                                        </a>
                                    </Button>
                                    {/* <a
                            href={d.cvUrl}
                            className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-center"
                        >
                            DOWNLOAD CV
                        </a> */}

                                    <div className="flex flex-wrap gap-2 ">
                                        <div className="text-xs text-card-foreground flex mt-1 pointer-events-cursor">
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
                        </div>

                        {/* TECH STACK */}
                        <div>
                            <div className="pb-2.5">
                                <TitleBar title="tech stack" />
                            </div>

                            <SkillTiles />
                        </div>

                        {/* BOTTOM */}
                        <div className="grid grid-cols-2 gap-6 ">
                            <div className="grid grid-flow-row ">
                                <TitleBar title="Other Info" />

                                <RadarSimple {...d.radar} />
                            </div>

                            <div className="grid content-start ">
                                <TitleBar title="projects" />
                                <div className="pl-2 pt-6 space-y-3 grid grid-flow-row font-inter text-base py-3 letter-spacing-wide font-semibold ">
                                    <a href="#" className="underline">
                                        &gt; Open-source:{' '}
                                        <span>{d.projects.openSource}</span>
                                    </a>
                                    <a href="#" className="underline">
                                        &gt; Startups:{' '}
                                        <span>{d.projects.startups}</span>
                                    </a>
                                    <a href="#" className="underline">
                                        &gt; Freelance:{' '}
                                        <span>{d.projects.freelance}</span>
                                    </a>
                                    <a href="#" className="underline">
                                        &gt; Corporate:{' '}
                                        <span>{d.projects.corporate}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="grid h-[954px] place-items-center rounded-2xl bg-card p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                        <div className="grid gap-4">
                            <p className="font-silkscreen text-3xl text-ring uppercase tracking-widest bg-card/70 px-6 py-3 rounded-full border border-ring/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                                coming soon
                            </p>
                            <p className="text-sm text-muted-foreground font-semibold">
                                The next profile card is in progress.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
