import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Hero = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    };

    return (
        <section ref={sectionRef} className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center bg-[#fcfbf9]">
            {/* Background decorative elements */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ffe4e6]/30 to-transparent skew-x-12 opacity-60 pointer-events-none"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-t from-[#fdf2f8]/40 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center h-full pt-20">
                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ opacity }}
                    className="md:w-1/2 text-left space-y-8 pl-4 md:pl-0"
                >
                    <motion.span variants={titleVariants} className="block text-secondary text-sm tracking-[0.3em] uppercase font-semibold">New Collection 2026</motion.span>

                    <div className="overflow-hidden">
                        <motion.h1 variants={titleVariants} className="text-7xl md:text-9xl font-serif text-text-dark leading-[0.9]">
                            Timeless <br />
                            <span className="italic text-secondary font-light">Elegance</span>
                        </motion.h1>
                    </div>

                    <motion.p variants={titleVariants} className="text-lg text-gray-600 max-w-md leading-relaxed font-light">
                        Discover the essence of pure beauty with our curated collection of luxury cosmetics. Designed to enhance, not conceal.
                    </motion.p>

                    <motion.div variants={titleVariants} className="flex space-x-6 pt-4">
                        <Link to="/shop" className="group relative px-8 py-4 bg-text-dark text-white font-medium tracking-widest overflow-hidden rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-secondary/20">
                            <span className="relative z-10 group-hover:text-secondary transition-colors duration-300 uppercase">Shop Now</span>
                            <div className="absolute inset-0 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                        </Link>
                        <Link to="/about" className="flex items-center space-x-2 text-text-dark font-medium tracking-wider group hover:text-secondary transition-colors duration-300">
                            <span>OUR STORY</span>
                            <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Hero Image / Graphic */}
                <motion.div
                    style={{ scale, opacity }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="md:w-1/2 h-full flex items-center justify-center relative"
                >
                    <div className="relative w-[300px] h-[450px] md:w-[450px] md:h-[650px] rounded-t-[225px] rounded-b-[40px] shadow-[0_50px_100px_-20px_rgba(212,163,115,0.15)] overflow-hidden glass border-[12px] border-white/90">
                        {/* High-end editorial image - Blends with soft cream background */}
                        <img
                            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000"
                            alt="Luxury Aesthetic"
                            className="w-full h-full object-cover transform scale-105"
                        />

                        {/* Overlay for perfect blending and text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                        {/* Signature Brand Mark */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center justify-center text-white/90 font-serif text-7xl italic font-light select-none pointer-events-none tracking-widest">
                            ELORIA
                        </div>
                    </div>

                    {/* Floating elements with Parallax and refined images */}
                    <motion.div
                        style={{ y: y2, rotate: 12 }}
                        className="absolute top-1/4 -right-12 w-40 h-40 bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl z-20 border border-white/50 overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600"
                            alt="Product Detail"
                            className="w-full h-full object-cover opacity-90"
                        />
                    </motion.div>

                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
            >
                <span className="text-[10px] tracking-[0.3em] uppercase text-text-dark/40">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-text-dark/40 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
