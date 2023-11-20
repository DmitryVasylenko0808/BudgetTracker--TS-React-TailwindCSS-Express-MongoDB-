import React from "react";
import { motion } from "framer-motion";

const loaderAnimation = {
    animate: {
        rotate: 360
    },
    transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop" as "loop",
        ease: "linear"
    }
}

type LoaderProps = {
    variant: "primary" | "secondary";
}

const Loader = ({ variant }: LoaderProps) => {
    const primaryClassName = "w-[80px] h-[80px] border-4 border-navy-light/20 border-s-navy-light rounded-full";
    const secondaryClassName = "w-[30px] h-[30px] border-2 border-white/40 border-s-white rounded-full";

    if (variant === "primary") {
        return (
            <div className="py-12 flex justify-center">
                <motion.div
                    animate={loaderAnimation.animate}
                    transition={loaderAnimation.transition}
                    className={primaryClassName}
                >
                </motion.div>
            </div>
        )
    } else if (variant === "secondary") {
        return (
            <motion.div
                animate={loaderAnimation.animate}
                transition={loaderAnimation.transition}
                className={secondaryClassName}
            >
            </motion.div>
        )
    } else return null;
}

export default Loader;