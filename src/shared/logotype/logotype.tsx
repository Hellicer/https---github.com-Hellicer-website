'use client'
import Image from 'next/image'

export default function Logotype(props: any) {
    return (
        <>
            <Image
                src="./logotype.svg"
                alt="logotype"
                height={65}
                width={162}
                className="pb-1"
            />
        </>
    )
}
