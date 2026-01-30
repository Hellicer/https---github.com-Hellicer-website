import Image from 'next/image'
import { profileData } from '../../../data/UserData'
import { RadarChart } from './RadarSkills'
import { CommonProps } from '@/interfaces/props'
import { SLUGS as skills } from '@/data/slugs'
import { Button } from '../button'
import { Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

// export function TechStackGrid({
//     stack,
// }: {
//     stack: { name: string; icon: string; url: string }[]
// }) {
//     return (
//         <div className="grid grid-cols-5 gap-3">
//             {stack.map(tech => (
//                 <a
//                     key={tech.name}
//                     href={tech.url}
//                     target="_blank"
//                     className="flex flex-col items-center text-xs gap-1 hover:scale-105 transition"
//                 >
//                     <Image
//                         src={tech.icon}
//                         alt={tech.name}
//                         width={36}
//                         height={36}
//                     />
//                     <span>{tech.name}</span>
//                 </a>
//             ))}
//         </div>
//     )
// }

// SkillTiles.tsx
// skills.data.ts
// export const skills = [
//     { name: 'AWS', color: 'bg-orange-600' },
//     { name: 'Cloudflare', color: 'bg-orange-500' },
//     { name: 'GitHub Pages', color: 'bg-gray-800' },
//     { name: 'Netlify', color: 'bg-teal-500' },
//     { name: 'Vercel', color: 'bg-black' },
//     { name: 'javascript', color: 'bg-yellow-400 text-black' },

//     { name: 'CSS3', color: 'bg-blue-600' },
//     { name: 'HTML5', color: 'bg-orange-500' },
//     { name: 'Typescript', color: 'bg-blue-500' },
//     { name: 'Kotlin', color: 'bg-purple-600' },
//     { name: 'bootstrap', color: 'bg-indigo-600' },
//     { name: 'Context API', color: 'bg-sky-600' },
//     { name: 'Nodedotjs', color: 'bg-red-600' },
//     { name: 'Next.js', color: 'bg-black' },

//     { name: 'PNPM', color: 'bg-orange-400' },
//     { name: 'React', color: 'bg-cyan-500' },
//     { name: 'React Query', color: 'bg-red-500' },
//     { name: 'React Router', color: 'bg-red-600' },
//     { name: 'React Hook Form', color: 'bg-pink-600' },
//     { name: 'Redux', color: 'bg-purple-500' },

//     { name: 'TailwindCSS', color: 'bg-teal-500' },
//     { name: 'Vite', color: 'bg-purple-500' },
//     { name: 'Webpack', color: 'bg-sky-500' },
//     { name: 'Firebase', color: 'bg-yellow-500' },
//     { name: 'Redis', color: 'bg-red-600' },
//     { name: 'MySQL', color: 'bg-blue-700' },
//     { name: 'MongoDB', color: 'bg-green-600' },
//     { name: 'SQLite', color: 'bg-sky-700' },

//     { name: 'Figma', color: 'bg-pink-500' },
//     { name: 'Git', color: 'bg-orange-600' },
//     { name: 'GitHub', color: 'bg-gray-900' },
//     { name: 'Docker', color: 'bg-sky-600' },
//     { name: 'Notion', color: 'bg-gray-800' },
//     { name: 'Postman', color: 'bg-orange-500' },
// ]

export function SkillTiles() {
    return (
        // ${skill.color}                        <div className="pl-2 pt-1">

        <div className="flex flex-wrap gap-2 pl-2 pt-1 ">
            {skills.map(skill => (
                <div
                    key={skill}
                    className={`
            bg-white/10
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
        <div className="grid rounded-2xl bg-card p-6 backdrop-blur-md transition-all text-sm space-y-6 max-w-xl w-full ">
            {/* MAIN INFO */}
            <div className="grid grid-flow-col gap-6">
                <div className="grid grid-flow-row gap-6">
                    <div className="font-inter text-base font-semibold">
                        <TitleBar title="main info" />
                        <div className="pl-2 pt-1">
                            <p>
                                <span className="text-violet8">
                                    &gt; Name:{' '}
                                </span>
                                {d.mainInfo.name}
                            </p>
                            <p>
                                <span className="text-violet8">
                                    &gt; Position:{' '}
                                </span>
                                {d.mainInfo.position}
                            </p>
                            <p>
                                <span className="text-violet8">&gt; Sex: </span>
                                {d.mainInfo.sex}
                            </p>
                            <p>
                                <span className="text-violet8">&gt; Old: </span>
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
                                <Download className=" ms-2 min-h-5.5 min-w-5.5" />
                            </a>
                        </Button>
                        {/* <a
                            href={d.cvUrl}
                            className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-center"
                        >
                            DOWNLOAD CV
                        </a> */}

                        <div className="flex flex-wrap gap-2 children:pointer-events-cursor">
                            <div className="text-xs text-muted-foreground flex mt-1 pointer-events-cursor">
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

                    <RadarChart {...d.radar} />
                </div>

                <div className="grid content-start ">
                    <TitleBar title="projects" />
                    <div className="pl-2 pt-3 space-y-3 grid grid-flow-row font-inter text-base py-3 letter-spacing-wide font-semibold ">
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
}
