"use client"

import { useRef, useState, useMemo, MouseEvent } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SpotlightCardProps<T extends React.ElementType> {
    as?: T
    children: React.ReactNode
    className?: string
    mode?: "stretch" | "auto"
}

export function SpotlightCard<T extends React.ElementType = "div">({
    children,
    className = "",
    as,
    mode = "stretch",
    ...props
}: SpotlightCardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof SpotlightCardProps<T>>) {
    const Component = as || "div"
    const MotionComponent = useMemo(() => motion(Component as any), [Component])
    const divRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            ref={divRef}
            className={cn("relative block", mode === "stretch" && "h-full")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <MotionComponent
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                    "relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
                    className
                )}
                {...props}
            >
                {children}
            </MotionComponent>
        </div>
    )
}
