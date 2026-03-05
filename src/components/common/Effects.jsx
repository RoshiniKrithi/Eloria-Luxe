import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// 1. Image Parallax Tilt (3D)
export const TiltCard = ({ children, className = "" }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            className={`w-full h-full ${className}`}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
                {children}
            </div>
        </motion.div>
    );
};

// 2. Text Reveal on Scroll
export const RevealText = ({ text, className = "", delay = 0 }) => {
    // Split by words, keeping spaces
    const words = text.split(/(\s+)/);

    return (
        <span className={`inline-block overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: '120%', opacity: 0, rotate: 5 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                        duration: 0.8,
                        delay: delay + (i * 0.08),
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    {word === ' ' ? '\u00A0' : word}
                </motion.span>
            ))}
        </span>
    );
};

// 3. Floating Gold Sparkles
export const FloatingSparkles = ({ count = 15 }) => {
    const [sparkles, setSparkles] = useState([]);

    useEffect(() => {
        const generateSparkles = () => {
            return Array.from({ length: count }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 5 + 3,
                delay: Math.random() * 5,
            }));
        };
        setSparkles(generateSparkles());
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    className="absolute rounded-full bg-secondary/80 blur-[1px]"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        width: sparkle.size,
                        height: sparkle.size,
                        boxShadow: '0 0 10px 2px rgba(212, 175, 55, 0.5)'
                    }}
                    animate={{
                        y: [-20, -150],
                        x: ['0px', '30px', '-30px', '0px'],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: sparkle.duration,
                        repeat: Infinity,
                        delay: sparkle.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

// 4. Magnetic Element
export const Magnetic = ({ children, strength = 0.2 }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: 'relative', display: 'inline-flex' }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

// 5. Parallax Image
export const ParallaxImage = ({ src, alt, className = "" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden w-full h-full pointer-events-none">
            <motion.img
                src={src}
                alt={alt}
                className={`w-full h-[130%] object-cover transform ${className}`}
                style={{ y, top: '-15%', position: 'absolute' }}
            />
        </div>
    );
};
