import Image from 'next/image'
import { profileData } from '../../../data/UserData'
import { RadarSimple } from './RadarSkills'
import { CommonProps } from '@/interfaces/props'
import { SLUGS as skills } from '@/data/slugs'
import { Button } from '../button'
// import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'
// import { UIIcon } from '../ui-icon'
import MemoryDownload from '../../../../public/memoryDownload.svg'

export function SkillTiles() {
    return (
        <div className="flex flex-wrap gap-2 pl-2 pt-1 ">
            {skills.map(skill => (
                <div
                    key={skill}
                    className={`
            bg-accent
            px-3 py-1.5
            rounded-md
            text-xs font-semibold
            flex items-center
            shadow-md
            hover:scale-105 transition
          `}
                >
                    <img
                        className="mr-2"
                        src={`https://cdn.simpleicons.org/${skill}/${skill}`}
                        width={16}
                        height={16}
                    />
                    <p className="capitalize">{skill}</p>
                </div>
            ))}
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
            <div className="grid rounded-2xl bg-card p-6 transition-transform duration-500 text-sm space-y-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] [transform-style:preserve-3d] group-hover:[transform:translateZ(18px)]">
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
                                <span className="text-chart-1">&gt; Sex: </span>
                                {d.mainInfo.sex}
                            </p>
                            <p>
                                <span className="text-chart-1">&gt; Old: </span>
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

                        <div className="flex flex-wrap gap-2 children:pointer-events-cursor">
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
                                    />
                                    wakatime
                                </a>
                                <div className="bg-[#0778b9] py-1  px-1 rounded-r-sm">
                                    {d.wakatime.text}
                                </div>
                            </div>

                            <a href={d.social.linkedin}>
                                <img
                                    className="ms-1  invert-100"
                                    src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxpbmtlZGluLWljb24gbHVjaWRlLWxpbmtlZGluIj48cGF0aCBkPSJNMTYgOGE2IDYgMCAwIDEgNiA2djdoLTR2LTdhMiAyIDAgMCAwLTItMiAyIDIgMCAwIDAtMiAydjdoLTR2LTdhNiA2IDAgMCAxIDYtNnoiLz48cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxMiIgeD0iMiIgeT0iOSIvPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIi8+PC9zdmc+`}
                                    width={24}
                                    height={24}
                                />
                            </a>
                            <a href={d.social.github}>
                                <img
                                    className="ms-1 invert-100"
                                    src={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdpdGh1Yi1pY29uIGx1Y2lkZS1naXRodWIiPjxwYXRoIGQ9Ik0xNSAyMnYtNGE0LjggNC44IDAgMCAwLTEtMy41YzMgMCA2LTIgNi01LjUuMDgtMS4yNS0uMjctMi40OC0xLTMuNS4yOC0xLjE1LjI4LTIuMzUgMC0zLjUgMCAwLTEgMC0zIDEuNS0yLjY0LS41LTUuMzYtLjUtOCAwQzYgMiA1IDIgNSAyYy0uMyAxLjE1LS4zIDIuMzUgMCAzLjVBNS40MDMgNS40MDMgMCAwIDAgNCA5YzAgMy41IDMgNS41IDYgNS41LS4zOS40OS0uNjggMS4wNS0uODUgMS42NS0uMTcuNi0uMjIgMS4yMy0uMTUgMS44NXY0Ii8+PHBhdGggZD0iTTkgMThjLTQuNTEgMi01LTItNy0yIi8+PC9zdmc+`}
                                    width={24}
                                    height={24}
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
        </div>
    )
}
