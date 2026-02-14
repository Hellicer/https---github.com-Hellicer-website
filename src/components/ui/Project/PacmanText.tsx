export function PacmanText() {
    return (
        <div className="relative w-full flex justify-center mt-20 overflow-hidden">
            {/* TEXT */}
            <h2 className="text-4xl font-bold tracking-widest relative z-10 pacman-text">
                NO PROJECTS FOUND
            </h2>

            {/* PACMAN */}
            <div className="pacman absolute left-0 top-1/2 -translate-y-1/2"></div>
        </div>
    )
}
