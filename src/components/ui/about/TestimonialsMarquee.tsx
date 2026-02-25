'use client'

import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/magicui/marquee'
import { CommonProps } from '@/interfaces/props'
import { useEffect, useState } from 'react'

const reviews = [
    {
        name: 'Jack',
        username: '@jack',
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: 'https://avatar.vercel.sh/jack',
    },
    {
        name: 'Jill',
        username: '@jill',
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: 'https://avatar.vercel.sh/jill',
    },
    {
        name: 'John',
        username: '@john',
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: 'https://avatar.vercel.sh/john',
    },
    {
        name: 'Jane',
        username: '@jane',
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: 'https://avatar.vercel.sh/jane',
    },
    {
        name: 'Jenny',
        username: '@jenny',
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: 'https://avatar.vercel.sh/jenny',
    },
    {
        name: 'James',
        username: '@james',
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: 'https://avatar.vercel.sh/james',
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string
    name: string
    username: string
    body: string
}) => {
    return (
        <figure
            className={cn(
                'relative h-full w-80 cursor-default overflow-hidden rounded-xl p-4',
                // light styles
                'bg-card  backdrop-blur-md transition-all hover:border-black/20 hover:bg-accent ',
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img
                    className="rounded-full"
                    width="32"
                    height="32"
                    loading="lazy"
                    decoding="async"
                    alt={`${name} avatar`}
                    src={img}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    )
}
export function TestimonialsMarquee({ className }: CommonProps = {}) {
    const [isFirefox, setIsFirefox] = useState(false)

    useEffect(() => {
        setIsFirefox(navigator.userAgent.toLowerCase().includes('firefox'))
    }, [])

    return (
        <div
            className="relative w-full items-center justify-center overflow-hidden place-self-end"
            style={
                isFirefox
                    ? undefined
                    : {
                          WebkitMaskImage:
                              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                          maskImage:
                              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                      }
            }
        >
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map(review => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map(review => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            {isFirefox && (
                <>
                    <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r to-transparent" />
                    <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l to-transparent" />
                </>
            )}
        </div>
    )
}
