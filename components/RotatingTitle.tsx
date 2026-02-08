"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

const titles = [
    "Full-Stack Developer",
    "DevOps Engineer",
    "Self Hosting Fan",
]

export function RotatingTitle() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % titles.length)
        }, 3000) // Change every 3 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <span className="relative block min-h-[1.5em]">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="block"
                >
                    {titles[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}
