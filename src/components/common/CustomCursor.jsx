import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
            setIsHovered(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
            {/* Main Outer Circle */}
            <motion.div
                className="absolute top-0 left-0 w-8 h-8 border border-secondary rounded-full -ml-4 -mt-4 mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    scale: isHovered ? 2 : isPressed ? 0.8 : 1,
                    backgroundColor: isHovered ? 'rgba(212, 163, 115, 0.2)' : 'transparent',
                }}
            />
            {/* Center Dot */}
            <motion.div
                className="absolute top-0 left-0 w-1.5 h-1.5 bg-secondary rounded-full -ml-[3px] -mt-[3px]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isHovered ? 0 : 1
                }}
            />
        </div>
    );
};

export default CustomCursor;
