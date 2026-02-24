import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ onComplete }) => {
    useEffect(() => {
        console.log("PageLoader Mounted");
        const timer = setTimeout(() => {
            console.log("PageLoader timer finished, letting exit happen...");
            if (onComplete) {
                onComplete();
            }
        }, 5000);

        return () => {
            clearTimeout(timer);
            console.log("PageLoader Unmounted");
        };
    }, [onComplete]);

    const essenceVariants = {
        initial: { scale: 0, opacity: 0, filter: "blur(20px)" },
        animate: {
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0.8],
            filter: "blur(0px)",
            transition: { duration: 2, ease: "easeOut" }
        }
    };

    const containerVariants = {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
        }
    };

    const letterVariants = {
        initial: { opacity: 0, y: 30, scale: 0.8, filter: "blur(10px)" },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                delay: 1.2 + i * 0.08,
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    const auraVariants = {
        animate: {
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
            rotate: [0, 180, 360],
            transition: {
                duration: 15,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const shimmerVariants = {
        animate: {
            x: ["-100%", "200%"],
            transition: {
                delay: 3.2,
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.8
            }
        }
    };

    const brandName = "ELORIA LUXE";

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary overflow-hidden !transition-none"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Stage 1: The Essence (Core Light) */}
            <motion.div
                variants={essenceVariants}
                initial="initial"
                animate="animate"
                className="absolute w-2 h-2 bg-secondary rounded-full shadow-[0_0_50px_20px_rgba(212,175,55,0.4)]"
            />

            {/* Background Dynamics: Aura & Particles */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    variants={auraVariants}
                    animate="animate"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] opacity-10"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
                </motion.div>

                {/* Rich Glimmer Starfield */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100
                        }}
                        animate={{
                            opacity: [0, Math.random() * 0.8 + 0.2, 0],
                            scale: [0, Math.random() * 1.5 + 0.5, 0],
                            x: (Math.random() - 0.5) * 1200,
                            y: (Math.random() - 0.5) * 1200,
                        }}
                        transition={{
                            duration: 6 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 7,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 rounded-full bg-secondary"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            boxShadow: `0 0 ${Math.random() * 10}px ${Math.random() * 2}px rgba(212,175,55,0.3)`
                        }}
                    />
                ))}
            </div>

            {/* Brand Reveal Stage */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="flex mb-8 relative">
                    {brandName.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            variants={letterVariants}
                            custom={i}
                            initial="initial"
                            animate="animate"
                            className={`text-5xl md:text-8xl font-serif font-bold tracking-[0.1em] text-text-dark drop-shadow-sm ${char === " " ? "mr-8" : ""}`}
                        >
                            {char}
                        </motion.span>
                    ))}

                    {/* The Light Sweep (Shimmer) */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                    />
                </div>

                <div className="h-[2px] w-64 bg-gray-100 relative overflow-hidden">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.2, duration: 3.3, ease: "easeInOut" }}
                        style={{ originX: 0 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary to-transparent"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 10, letterSpacing: "1em" }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        letterSpacing: "0.5em",
                        transition: { delay: 3.5, duration: 1.2, ease: "easeOut" }
                    }}
                    className="mt-10 text-[10px] md:text-xs uppercase text-text-dark/40 font-sans font-bold text-center"
                >
                    Defining Elegance & Radiance
                </motion.p>
            </div>

            {/* Stage 5: Luxury Affirmation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 3.8, duration: 1.2 }}
                className="absolute bottom-12 text-[9px] uppercase tracking-[0.8em] text-secondary font-bold"
            >
                ESTABLISHED 2026
            </motion.div>
        </motion.div>
    );
};

export default PageLoader;
