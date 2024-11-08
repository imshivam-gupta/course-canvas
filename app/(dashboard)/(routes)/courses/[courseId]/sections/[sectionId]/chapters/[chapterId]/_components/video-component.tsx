"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

type AnimationStyle =
    | "from-bottom"
    | "from-center"
    | "from-top"
    | "from-left"
    | "from-right"
    | "fade"
    | "top-in-bottom-out"
    | "left-in-right-out";

interface HeroVideoProps {
    animationStyle?: AnimationStyle;
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt?: string;
    className?: string;
}

const animationVariants = {
    "from-bottom": { initial: { y: "100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } },
    "from-center": { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } },
    "from-top": { initial: { y: "-100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "-100%", opacity: 0 } },
    "from-left": { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "-100%", opacity: 0 } },
    "from-right": { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } },
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
    "top-in-bottom-out": { initial: { y: "-100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } },
    "left-in-right-out": { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } },
};

export function HeroVideoDialog({
                                    animationStyle = "from-center",
                                    videoSrc,
                                    thumbnailSrc,
                                    thumbnailAlt = "Video thumbnail",
                                    className,
                                }: HeroVideoProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const selectedAnimation = animationVariants[animationStyle];

    return (
        <div className={cn("relative", className)}>
            <div
                className="relative cursor-pointer group w-full"
                style={{ aspectRatio: "16 / 9" }} // Maintain consistent aspect ratio
                onClick={() => setIsVideoPlaying(true)}
            >

                    <motion.div
                        {...selectedAnimation}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="w-full h-full overflow-hidden rounded-md"
                    >
                        <iframe
                            src={videoSrc}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </motion.div>

            </div>
        </div>
    );
}
