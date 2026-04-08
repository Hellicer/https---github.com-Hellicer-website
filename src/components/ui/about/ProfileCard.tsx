'use client'
import { RadarSimple } from './RadarSkills'
import { CommonProps } from '@/interfaces/props'
import { Button } from '../button'
// import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'
import type { ProfileDataShape } from '@/types/profile'
import { fetchProfileStat } from '@/api/profileClientApi'
import { SkillTiles } from './SkillTiles'
import { TitleBar } from './TitleBar'
// import 'swiper/css'
// import 'swiper/css/effect-cards'
// import { UIIcon } from '../ui-icon'
// import MemoryDownload from '../../../../public/memoryDownload.svg'

export function ProfileCard({ className }: CommonProps = {}) {
    const t = useTranslations('')
    const [profileCards, setProfileCards] = useState<ProfileDataShape[]>([])
    const [profileSource, setProfileSource] = useState<
        'loading' | 'gist' | 'local'
    >('loading')
    const [profileLoadReason, setProfileLoadReason] = useState<string | null>(
        null,
    )
    const shouldShowComingSoonFallback = profileCards.length === 0
    const shouldUseSwiper = profileCards.length > 0

    useEffect(() => {
        let isMounted = true

        fetchProfileStat().then(result => {
            if (!isMounted) {
                return
            }

            if (result.data.length > 0) {
                setProfileCards(result.data)
                setProfileSource(result.source)
                setProfileLoadReason(null)
            } else {
                setProfileSource('local')
                setProfileLoadReason(result.reason ?? null)
            }
        })

        return () => {
            isMounted = false
        }
    }, [])

    // const mapTitleToKey = {
    //     mainInfo: 'mainInfo',
    //     skills: 'skills',
    //     techStack: 'techStack',
    //     radar: 'radar',
    //     projects: 'projects',
    // }
    const renderProfileCardContent = (d: ProfileDataShape) => (
        <div className="grid min-h-[860px] min-w-0 gap-6 rounded-2xl bg-card p-4 text-sm transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 min-[581px]:min-h-[954px]">
            {/* <div className="flex items-center justify-between rounded-md border border-ring/40 bg-card/70 px-3 py-2 text-xs font-semibold">
                <span>
                    Data source:{' '}
                    {profileSource === 'loading'
                        ? 'loading'
                        : profileSource === 'gist'
                          ? 'StatGist'
                          : 'local fallback'}
                </span>
                {profileLoadReason && (
                    <span className="ml-2 max-w-60 truncate text-muted-foreground">
                        {profileLoadReason}
                    </span>
                )}
            </div> */}
            <div className="grid min-w-0 gap-6 min-[581px]:grid-cols-[minmax(0,1fr)_auto]">
                <div className="order-1 min-w-0 font-inter text-base font-semibold min-[581px]:col-start-1 min-[581px]:row-start-1">
                    <TitleBar title={t('profileCard.mainInfo')} />
                    <div className="pl-2 pt-1">
                        <p>
                            <span className="text-chart-1">
                                &gt; {t('profileCard.name')}:{' '}
                            </span>
                            {d.mainInfo.name}
                        </p>
                        <p>
                            <span className="text-chart-1">
                                &gt; {t('profileCard.position')}:{' '}
                            </span>
                            {d.mainInfo.position}
                        </p>
                        <p>
                            <span className="text-chart-1">
                                &gt; {t('profileCard.sex')}:{' '}
                            </span>
                            {d.mainInfo.sex}
                        </p>
                        <p>
                            <span className="text-chart-1">
                                &gt; {t('profileCard.age')}:{' '}
                            </span>
                            {d.mainInfo.age}
                        </p>
                    </div>
                </div>

                {/* AVATAR */}
                <div className="order-2 grid min-w-0 content-start gap-4 min-[581px]:col-start-2 min-[581px]:row-span-2 min-[581px]:row-start-1 min-[581px]:grid-cols-1">
                    <div className="flex h-32 w-32 max-[580px]:h-48 max-[580px]:w-full items-center justify-center rounded-xl bg-gray-500/40 min-[581px]:h-50 min-[581px]:w-50">
                        {d.mainInfo.avatar ? (
                            <img
                                src={d.mainInfo.avatar}
                                alt={`${d.mainInfo.name} photo`}
                                className="h-full w-full rounded-xl object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        ) : (
                            <span>{t('profileCard.photo')}</span>
                        )}
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
                                    href={d.wakatime.url}
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
                                    className="h-[24px] w-[24px] mt-1  text-white"
                                    aria-label="LinkedIn icon"
                                />
                            </a>
                            <a href={d.social.github}>
                                <GitHubLogoIcon
                                    className="h-[24px] w-[24px] mt-1 text-white"
                                    aria-label="GitHub icon"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* SKILLS */}
                <div className="order-3 min-[581px]:col-start-1 min-[581px]:row-start-2">
                    <TitleBar title={t('profileCard.skills')} />

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

            <div>
                <div className="pb-2.5">
                    <TitleBar title={t('profileCard.techStack')} />
                </div>

                <SkillTiles techStack={d.techStack} />
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-6 min-[581px]:grid-cols-2">
                <div className="grid grid-flow-row">
                    <TitleBar title={t('profileCard.otherInfo')} />

                    <RadarSimple {...d.radar} />
                </div>

                <div className="grid min-w-0 content-start">
                    <TitleBar title={t('profileCard.projects')} />
                    <div className="letter-spacing-wide grid grid-flow-row space-y-3 py-3 pt-4 pl-2 font-inter text-sm font-semibold sm:pt-6 sm:text-base">
                        {[
                            ['Open-source', d.projects.openSource],
                            ['Startups', d.projects.startups],
                            ['Freelance', d.projects.freelance],
                            ['Corporate', d.projects.corporate],
                        ].map(([label, value]) => (
                            <a key={label} href="#" className="underline">
                                &gt; {label}: <span>{value}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const emptyProfileCardContent = (
        <div className="grid min-h-[860px] min-w-0 gap-6 rounded-2xl bg-card p-4 text-sm transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 min-[581px]:min-h-[954px]">
            <div className="grid min-w-0 gap-6 min-[581px]:grid-cols-[minmax(0,1fr)_auto]">
                <div className="order-1 min-w-0 font-inter text-base font-semibold min-[581px]:col-start-1 min-[581px]:row-start-1">
                    <TitleBar title="main info" />
                </div>
                <div className="order-2 grid min-w-0 content-start gap-4 min-[581px]:col-start-2 min-[581px]:row-span-2 min-[581px]:row-start-1 min-[581px]:grid-cols-1">
                    <div className="flex h-32 w-32 max-[580px]:h-48 max-[580px]:w-full items-center justify-center rounded-xl bg-gray-500/20 min-[581px]:h-50 min-[581px]:w-50" />
                </div>
                <div className="order-3 min-[581px]:col-start-1 min-[581px]:row-start-2">
                    <TitleBar title="skills" />
                </div>
            </div>

            <div>
                <div className="pb-2.5">
                    <TitleBar title="tech stack" />
                </div>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-6 min-[581px]:grid-cols-2">
                <div className="grid grid-flow-row">
                    <TitleBar title="Other Info" />
                </div>

                <div className="grid min-w-0 content-start">
                    <TitleBar title="projects" />
                </div>
            </div>
        </div>
    )

    // const comingSoonContent = (
    //     <div className="grid min-h-[860px] min-w-0 place-items-center rounded-2xl bg-card p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] min-[581px]:min-h-[954px]">
    //         <div className="grid gap-4">
    //             <p className="rounded-full border border-ring/40 bg-card/70 px-4 py-3 font-silkscreen text-2xl tracking-widest text-ring uppercase shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:px-6 sm:text-3xl">
    //                 {t('common.comingSoon')}
    //             </p>
    //             <p className="text-sm text-muted-foreground font-semibold">
    //                 The next profile card is in progress.
    //             </p>
    //         </div>
    //     </div>
    // )

    if (shouldShowComingSoonFallback) {
        return (
            <div
                className={`group w-full min-w-0 max-w-xl [perspective:1000px] ${className}`}
            >
                {emptyProfileCardContent}
            </div>
        )
    }

    return (
        <div
            className={`group w-full min-w-0 max-w-xl [perspective:1000px] ${className}`}
        >
            {shouldUseSwiper ? (
                <Swiper
                    effect="cards"
                    grabCursor
                    autoHeight
                    modules={[EffectCards]}
                    className="w-full min-w-0"
                >
                    {profileCards.map((card, index) => (
                        <SwiperSlide
                            key={`${card.mainInfo.name}-${index}`}
                            className="min-w-0"
                        >
                            {renderProfileCardContent(card)}
                        </SwiperSlide>
                    ))}
                    <SwiperSlide className="min-w-0">
                        {emptyProfileCardContent}
                    </SwiperSlide>
                </Swiper>
            ) : (
                renderProfileCardContent(profileCards[0])
            )}
        </div>
    )
}
