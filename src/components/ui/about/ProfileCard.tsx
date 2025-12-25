import Image from 'next/image'
import { profileData } from '../../../data/UserData'
import { RadarChart } from './RadarSkills'
import { CommonProps } from '@/interfaces/props'

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
export const skills = [
    { name: 'AWS', color: 'bg-orange-600' },
    { name: 'Cloudflare', color: 'bg-orange-500' },
    { name: 'GitHub Pages', color: 'bg-gray-800' },
    { name: 'Netlify', color: 'bg-teal-500' },
    { name: 'Vercel', color: 'bg-black' },
    { name: 'JavaScript', color: 'bg-yellow-400 text-black' },

    { name: 'CSS3', color: 'bg-blue-600' },
    { name: 'HTML5', color: 'bg-orange-500' },
    { name: 'TypeScript', color: 'bg-blue-500' },
    { name: 'Kotlin', color: 'bg-purple-600' },
    { name: 'Bootstrap', color: 'bg-indigo-600' },
    { name: 'Context API', color: 'bg-sky-600' },
    { name: 'NPM', color: 'bg-red-600' },
    { name: 'Next.js', color: 'bg-black' },

    { name: 'PNPM', color: 'bg-orange-400' },
    { name: 'React', color: 'bg-cyan-500' },
    { name: 'React Query', color: 'bg-red-500' },
    { name: 'React Router', color: 'bg-red-600' },
    { name: 'React Hook Form', color: 'bg-pink-600' },
    { name: 'Redux', color: 'bg-purple-500' },

    { name: 'TailwindCSS', color: 'bg-teal-500' },
    { name: 'Vite', color: 'bg-purple-500' },
    { name: 'Webpack', color: 'bg-sky-500' },
    { name: 'Firebase', color: 'bg-yellow-500' },
    { name: 'Redis', color: 'bg-red-600' },
    { name: 'MySQL', color: 'bg-blue-700' },
    { name: 'MongoDB', color: 'bg-green-600' },
    { name: 'SQLite', color: 'bg-sky-700' },

    { name: 'Figma', color: 'bg-pink-500' },
    { name: 'Git', color: 'bg-orange-600' },
    { name: 'GitHub', color: 'bg-gray-900' },
    { name: 'Docker', color: 'bg-sky-600' },
    { name: 'Notion', color: 'bg-gray-800' },
    { name: 'Postman', color: 'bg-orange-500' },
]

export function SkillTiles() {
    return (
        <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
                <div
                    key={skill.name}
                    className={`
            ${skill.color}
            px-3 py-1.5
            rounded-md
            text-xs font-semibold
            flex items-center
            shadow-md
            hover:scale-105 transition
          `}
                >
                    {skill.name}
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

    return (
        <div className="grid rounded-2xl bg-card p-6 text-sm space-y-6 max-w-xl w-full">
            {/* MAIN INFO */}
            <div className="grid grid-flow-col gap-6">
                <div className="grid grid-flow-row gap-6">
                    <div className="font-inter text-base font-bold">
                        <TitleBar title="main info" />

                        <div className="pl-2 pt-1">
                            <p>
                                <span className="text-violet8">
                                    &gt; Name:{' '}
                                </span>
                                <b>{d.mainInfo.name}</b>
                            </p>
                            <p>
                                <span className="text-violet8">
                                    &gt; Position:{' '}
                                </span>
                                <b>{d.mainInfo.position}</b>
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

                        <div className="pl-2">
                            {d.skills.map(s => (
                                <p
                                    className="font-inter text-base font-bold"
                                    key={s}
                                >
                                    {s}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* AVATAR */}
                <div className="gap-4 grid grid-flow-row">
                    <div className="w-50 h-50 rounded-xl bg-gray-500/40 flex items-center justify-center">
                        <span>Photo</span>
                    </div>

                    <div className="flex flex-col w-full max-w-50 gap-2">
                        <a
                            href={d.cvUrl}
                            className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-700 text-center"
                        >
                            DOWNLOAD CV
                        </a>

                        <div className="text-xs text-muted-foreground">
                            wakatime · {d.wakatime.text}
                        </div>

                        <div className="flex gap-3">
                            <a href={d.social.linkedin}>LinkedIn</a>
                            <a href={d.social.github}>GitHub</a>
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
            <div className="grid grid-cols-2 gap-6">
                <div className="grid grid-flow-row">
                    <TitleBar title="Other Info" />

                    <RadarChart {...d.radar} />
                </div>

                <div className="grid content-start ">
                    <TitleBar title="projects" />
                    <div className="pl-2 pt-6.5 space-y-3 grid grid-flow-row font-inter text-base py-3 letter-spacing-wide ">
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
