import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Leaf, Beaker, Globe, ArrowRight, Quote, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';



/* ══════════════════════════════════════════════
   EFFECT 2: Marquee Text Banner
   ══════════════════════════════════════════════ */
const MarqueeBanner = () => {
    const items = ['LUXURY', 'PURITY', 'INNOVATION', 'TIMELESS', 'RADIANCE', 'ELEGANCE', 'BOTANICAL', 'SWISS CRAFTED'];
    const repeated = [...items, ...items, ...items];

    return (
        <div className="py-6 bg-[#0e0d0a] overflow-hidden border-y border-secondary/10">
            <motion.div
                className="flex whitespace-nowrap gap-0"
                animate={{ x: ['0%', '-33.333%'] }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            >
                {repeated.map((text, i) => (
                    <span key={i} className="flex items-center gap-8 mx-8">
                        <span className="text-sm font-light tracking-[0.3em] text-white/20 uppercase font-serif">{text}</span>
                        <span className="text-secondary/40 text-xs">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/* ══════════════════════════════════════════════
   EFFECT 3: 3D Tilt Card
   ══════════════════════════════════════════════ */
const TiltCard = ({ children, className = '' }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouse = useCallback((e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/* ══════════════════════════════════════════════
   EFFECT 4: Image Reveal Curtain
   ══════════════════════════════════════════════ */
const ImageReveal = ({ src, alt, className = '' }) => (
    <div className={`relative overflow-hidden ${className}`}>
        <motion.div
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-10 bg-secondary origin-right"
        />
        <motion.img
            src={src}
            alt={alt}
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover"
        />
    </div>
);

/* ══════════════════════════════════════════════
   EFFECT 5: Signature SVG Animation
   ══════════════════════════════════════════════ */
const SignatureAnimation = ({ name }) => {
    const pathRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.5 });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative h-16 mt-4">
            <svg viewBox="0 0 300 60" className="w-64 h-16 overflow-visible">
                <motion.text
                    x="0" y="45"
                    className="font-serif"
                    style={{ fontSize: '36px', fill: 'none', stroke: '#d4af37', strokeWidth: 0.8 }}
                    initial={{ strokeDasharray: 800, strokeDashoffset: 800 }}
                    animate={isVisible ? { strokeDashoffset: 0 } : {}}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                >
                    {name}
                </motion.text>
                <motion.text
                    x="0" y="45"
                    className="font-serif"
                    style={{ fontSize: '36px', fill: '#d4af37', strokeWidth: 0 }}
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 0.8 } : {}}
                    transition={{ duration: 0.8, delay: 2.2 }}
                >
                    {name}
                </motion.text>
            </svg>
        </div>
    );
};

/* ─── Gold Glitter Canvas ─── */
const GlitterCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animFrameId;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener('resize', resize);

        const goldColors = [
            'rgba(212,175,55,', 'rgba(244,240,232,', 'rgba(255,215,100,',
            'rgba(180,140,50,', 'rgba(255,240,200,',
        ];

        const w = () => canvas.offsetWidth;
        const h = () => canvas.offsetHeight;

        const PARTICLE_COUNT = 90;
        const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * w(), y: Math.random() * h(),
            r: Math.random() * 2.5 + 0.5, opacity: Math.random() * 0.5 + 0.1,
            speed: Math.random() * 0.3 + 0.05, drift: (Math.random() - 0.5) * 0.3,
            color: goldColors[Math.floor(Math.random() * goldColors.length)],
            twinkleSpeed: Math.random() * 0.02 + 0.005, twinklePhase: Math.random() * Math.PI * 2,
        }));

        const SPARKLE_COUNT = 35;
        const sparkles = Array.from({ length: SPARKLE_COUNT }, () => ({
            x: Math.random() * w(), y: Math.random() * h(),
            size: Math.random() * 3 + 1, opacity: 0,
            maxOpacity: Math.random() * 0.9 + 0.3, fadeIn: true,
            speed: Math.random() * 0.015 + 0.005,
            color: goldColors[Math.floor(Math.random() * goldColors.length)],
        }));

        const draw = () => {
            const cw = w(), ch = h();
            ctx.clearRect(0, 0, cw, ch);
            const bg = ctx.createRadialGradient(cw * 0.5, ch * 0.4, 0, cw * 0.5, ch * 0.4, cw * 0.8);
            bg.addColorStop(0, '#1a1508'); bg.addColorStop(0.6, '#0e0d0a'); bg.addColorStop(1, '#080706');
            ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, ch);

            particles.forEach(p => {
                p.y -= p.speed; p.x += p.drift;
                p.twinklePhase += p.twinkleSpeed;
                const tw = Math.sin(p.twinklePhase) * 0.35 + 0.65;
                if (p.y < -10) { p.y = ch + 10; p.x = Math.random() * cw; }
                if (p.x < -10) p.x = cw + 10;
                if (p.x > cw + 10) p.x = -10;
                ctx.beginPath();
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
                grd.addColorStop(0, p.color + (p.opacity * tw) + ')');
                grd.addColorStop(1, p.color + '0)');
                ctx.fillStyle = grd; ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2); ctx.fill();
            });

            sparkles.forEach(s => {
                if (s.fadeIn) { s.opacity = Math.min(s.opacity + s.speed, s.maxOpacity); if (s.opacity >= s.maxOpacity) s.fadeIn = false; }
                else {
                    s.opacity = Math.max(s.opacity - s.speed * 0.7, 0);
                    if (s.opacity <= 0) { s.x = Math.random() * cw; s.y = Math.random() * ch; s.opacity = 0; s.maxOpacity = Math.random() * 0.9 + 0.3; s.size = Math.random() * 3 + 1; s.fadeIn = true; s.color = goldColors[Math.floor(Math.random() * goldColors.length)]; }
                }
                const col = s.color + s.opacity + ')';
                ctx.save(); ctx.translate(s.x, s.y); ctx.strokeStyle = col; ctx.lineWidth = 0.8;
                const sz = s.size;
                ctx.beginPath();
                ctx.moveTo(-sz * 2, 0); ctx.lineTo(sz * 2, 0);
                ctx.moveTo(0, -sz * 2); ctx.lineTo(0, sz * 2);
                ctx.moveTo(-sz, -sz); ctx.lineTo(sz, sz);
                ctx.moveTo(sz, -sz); ctx.lineTo(-sz, sz);
                ctx.stroke();
                ctx.beginPath(); ctx.arc(0, 0, sz * 0.4, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
                ctx.restore();
            });

            const vignette = ctx.createRadialGradient(cw / 2, ch / 2, cw * 0.2, cw / 2, ch / 2, cw * 0.85);
            vignette.addColorStop(0, 'rgba(0,0,0,0)'); vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
            ctx.fillStyle = vignette; ctx.fillRect(0, 0, cw, ch);
            animFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animFrameId); window.removeEventListener('resize', resize); };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ width: '100%', height: '100%' }} />;
};

/* ─── Animated Counter ─── */
const AnimatedNumber = ({ target, suffix = '', label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                let start = 0;
                const duration = 2000;
                const stepTime = 16;
                const steps = duration / stepTime;
                const increment = target / steps;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= target) { setCount(target); clearInterval(timer); }
                    else setCount(Math.floor(start));
                }, stepTime);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <div ref={ref} className="text-center">
            <p className="text-5xl md:text-6xl font-serif text-secondary">{count}{suffix}</p>
            <p className="text-sm text-gray-500 mt-3 tracking-widest uppercase font-light">{label}</p>
        </div>
    );
};

/* ─── Timeline Item ─── */
const TimelineItem = ({ year, title, description, idx }) => (
    <motion.div
        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`flex items-start gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center`}
    >
        <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
            <p className="text-secondary font-serif text-2xl mb-2">{year}</p>
            <h4 className="text-xl font-serif text-text-dark mb-2">{title}</h4>
            <p className="text-gray-500 font-light text-sm leading-relaxed">{description}</p>
        </div>
        <div className="hidden md:flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-secondary border-4 border-primary shadow-lg shadow-secondary/30" />
            <div className="w-px h-24 bg-secondary/20" />
        </div>
        <div className="md:w-1/2" />
    </motion.div>
);

/* ══════════════════════════════════════════════
   MAIN ABOUT PAGE
   ══════════════════════════════════════════════ */
const About = () => {
    const parallaxRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    const values = [
        { icon: <Sparkles className="w-6 h-6" />, title: "Clinical Efficacy", stat: "97%", statLabel: "Saw visible results in 4 weeks", desc: "Formulated with clinically proven active ingredients at optimal concentrations." },
        { icon: <Leaf className="w-6 h-6" />, title: "Botanical Purity", stat: "100%", statLabel: "Natural origin ingredients", desc: "Sourcing only the highest-grade, organic plant extracts for profound nourishment." },
        { icon: <Globe className="w-6 h-6" />, title: "Ethical Sourcing", stat: "12", statLabel: "Partner farms worldwide", desc: "We partner directly with transparent, sustainable farms across 3 continents." },
        { icon: <Beaker className="w-6 h-6" />, title: "Cruelty Free", stat: "0", statLabel: "Animal tests — ever", desc: "Certified cruelty-free. Every formula tested rigorously on human volunteers only." },
    ];

    const timeline = [
        { year: "2018", title: "The Vision", description: "Eleanor Vane returns from a decade in Swiss biochemistry labs with a revolutionary concept: luxury skincare that truly performs." },
        { year: "2019", title: "First Formulations", description: "After 847 iterations, our signature Golden Radiance Serum achieves the perfect balance of 24K gold peptides and alpine botanicals." },
        { year: "2021", title: "Global Recognition", description: "Featured in Vogue, Harper's Bazaar, and awarded 'Best Emerging Luxury Brand' at the International Beauty Awards." },
        { year: "2024", title: "Sustainability Pledge", description: "100% recyclable glass packaging, carbon-neutral operations, and zero-waste manufacturing achieved across all product lines." },
    ];

    return (
        <div className="pt-24 min-h-screen bg-primary">

            {/* ═══ HERO ═══ */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0e0d0a]">
                <GlitterCanvas />
                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: '0.3em' }}
                        animate={{ opacity: 1, letterSpacing: '0.25em' }}
                        transition={{ duration: 1.2, delay: 0.1 }}
                        className="text-xs text-secondary uppercase tracking-[0.25em] font-medium mb-6"
                    >
                        Since 2018 · Crafted in Switzerland
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ textShadow: '0 0 60px rgba(212,175,55,0.25), 0 2px 4px rgba(0,0,0,0.5)' }}
                        className="text-5xl md:text-8xl font-serif text-white mb-6"
                    >
                        The Art of <br />
                        <span className="italic text-secondary">Timeless Beauty</span>
                    </motion.h1>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                        className="w-20 h-px bg-secondary mx-auto mb-6 origin-center"
                    />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-base text-white/60 max-w-xl mx-auto font-light leading-relaxed tracking-wide"
                    >
                        Where nature's purest elements meet cutting-edge scientific innovation.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 8, 0] }}
                        transition={{ opacity: { duration: 1, delay: 1.5 }, y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } }}
                        className="mt-12"
                    >
                        <ChevronDown className="w-6 h-6 text-secondary/60 mx-auto" />
                    </motion.div>
                </div>
            </section>

            {/* EFFECT 2: Marquee Text Banner */}
            <MarqueeBanner />

            {/* ═══ IMPACT NUMBERS ═══ */}
            <section className="py-20 bg-white border-b border-gray-100">
                <div className="container mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <AnimatedNumber target={847} label="Formulations tested" />
                    <AnimatedNumber target={97} suffix="%" label="Saw visible results" />
                    <AnimatedNumber target={36} label="Countries served" />
                    <AnimatedNumber target={0} label="Animal tests — ever" />
                </div>
            </section>

            {/* ═══ OUR STORY — EFFECT 4: Image Reveal Curtain + EFFECT 5: Signature ═══ */}
            <section id="story" className="py-28 px-6 md:px-12 overflow-hidden" ref={parallaxRef}>
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            {/* EFFECT 4: Gold curtain wipes across to reveal the image */}
                            <ImageReveal
                                src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1400&auto=format&fit=crop"
                                alt="Our Formulation Process"
                                className="rounded-sm shadow-2xl aspect-[4/5]"
                            />
                            {/* Floating gold accent badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                                className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-secondary flex flex-col items-center justify-center text-white shadow-xl shadow-secondary/30 z-20"
                            >
                                <span className="text-2xl font-serif">10+</span>
                                <span className="text-[9px] uppercase tracking-wider">Years R&D</span>
                            </motion.div>
                        </div>

                        <motion.div {...fadeIn} className="space-y-8">
                            <h2 className="text-sm tracking-[0.2em] text-secondary uppercase font-medium">Our Story</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight">
                                Born from a desire for <span className="italic">uncompromised</span> excellence.
                            </h3>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed text-lg">
                                <p>
                                    Eloria Luxe began with a simple yet profound realization: the modern muse refuses to choose between clinical efficacy and a luxurious sensory experience.
                                </p>
                                <p>
                                    Our founder spent over a decade working alongside master botanists and elite biochemists in Switzerland, meticulously studying how rare, sustainably harvested botanicals interact with advanced skin-identical active ingredients.
                                </p>
                            </div>
                            {/* Founder quote */}
                            <div className="border-l-2 border-secondary pl-6 py-2">
                                <Quote className="w-5 h-5 text-secondary/40 mb-2" />
                                <p className="text-text-dark font-serif italic text-lg leading-relaxed">
                                    "I wanted to create something that would make a woman pause, breathe, and truly feel the beauty of the moment."
                                </p>
                                <div className="mt-4">
                                    {/* EFFECT 5: Signature draws itself */}
                                    <SignatureAnimation name="Eleanor Vane" />
                                    <p className="text-xs tracking-widest uppercase text-gray-400 mt-1 font-medium">Founder & Chief Formulator</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* EFFECT 2: Second Marquee (reverse direction) */}
            <div className="py-4 bg-primary overflow-hidden border-y border-secondary/10">
                <motion.div
                    className="flex whitespace-nowrap gap-0"
                    animate={{ x: ['-33.333%', '0%'] }}
                    transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                >
                    {[...Array(3)].flatMap((_, setIdx) =>
                        ['SERUM', 'ELIXIR', 'RADIANCE', 'GOLDEN', 'BOTANICAL', 'PURE', 'GLOW', 'LUXE'].map((text, i) => (
                            <span key={`${setIdx}-${i}`} className="flex items-center gap-8 mx-8">
                                <span className="text-sm font-light tracking-[0.3em] text-text-dark/10 uppercase font-serif">{text}</span>
                                <span className="text-secondary/20 text-xs">◆</span>
                            </span>
                        ))
                    )}
                </motion.div>
            </div>

            {/* ═══ PHILOSOPHY / VALUES — EFFECT 3: 3D Tilt Cards ═══ */}
            <section className="py-28 bg-[#0e0d0a] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' fill=\'%23d4af37\'/%3E%3C/svg%3E")' }} />

                <div className="container mx-auto max-w-6xl px-6 relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-20">
                        <h2 className="text-sm tracking-[0.25em] text-secondary uppercase font-medium mb-4">Our Philosophy</h2>
                        <h3 className="text-3xl md:text-5xl font-serif">
                            The Pillars of <span className="italic text-secondary">Eloria Luxe</span>
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, idx) => (
                            /* EFFECT 3: Each card tilts in 3D on hover */
                            <TiltCard key={idx} className="cursor-pointer">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                                    className="group relative border border-white/10 rounded-2xl p-8 hover:border-secondary/50 transition-all duration-700 bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm h-full"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0e0d0a] border border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        {value.icon}
                                    </div>
                                    <div className="pt-4 text-center">
                                        <p className="text-3xl font-serif text-secondary mb-1">{value.stat}</p>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-6">{value.statLabel}</p>
                                        <h4 className="text-lg font-serif text-white mb-3">{value.title}</h4>
                                        <p className="text-white/40 font-light text-sm leading-relaxed">{value.desc}</p>
                                    </div>
                                    {/* Subtle glow on hover */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(212,175,55,0.06)' }} />
                                </motion.div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ TIMELINE / JOURNEY ═══ */}
            <section className="py-28 px-6 md:px-12">
                <div className="container mx-auto max-w-4xl">
                    <motion.div {...fadeIn} className="text-center mb-20">
                        <h2 className="text-sm tracking-[0.25em] text-secondary uppercase font-medium mb-4">Our Journey</h2>
                        <h3 className="text-3xl md:text-5xl font-serif text-text-dark">
                            Moments that <span className="italic">defined</span> us
                        </h3>
                    </motion.div>

                    <div className="space-y-0">
                        {timeline.map((item, idx) => (
                            <TimelineItem key={idx} idx={idx} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SUSTAINABILITY — EFFECT 4: Image Reveal on bg ═══ */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=2000&auto=format&fit=crop"
                        alt="Sustainable Packaging"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-text-dark/85" />
                </div>

                <div className="relative z-10 container mx-auto max-w-5xl px-6 text-center text-white">
                    <motion.div {...fadeIn} className="space-y-8">
                        <h2 className="text-sm tracking-[0.25em] text-secondary uppercase font-medium">Sustainability</h2>
                        <h3 className="text-4xl md:text-6xl font-serif leading-tight">
                            Beauty that respects<br />the <span className="italic text-secondary">Earth</span>.
                        </h3>
                        <p className="text-white/60 font-light leading-relaxed text-lg max-w-2xl mx-auto">
                            100% recyclable glass vessels. FSC-certified paper. Vegetable-based inks. Carbon-neutral operations. We believe true luxury should never come at the expense of our planet.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 pt-8">
                            {["100% Recyclable", "Carbon Neutral", "Zero Waste", "Cruelty Free"].map((badge, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="border border-secondary/30 rounded-full px-6 py-2 text-xs tracking-widest uppercase text-secondary font-medium hover:bg-secondary hover:text-white transition-all duration-500 cursor-default"
                                >
                                    {badge}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="py-28 bg-primary text-center px-6">
                <motion.div {...fadeIn} className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-sm tracking-[0.25em] text-secondary uppercase font-medium">Begin Your Ritual</h2>
                    <h3 className="text-4xl md:text-6xl font-serif text-text-dark italic leading-tight">
                        Discover Your<br />Signature Glow
                    </h3>
                    <p className="text-gray-500 font-light leading-relaxed text-lg">
                        Elevate your everyday routine into a moment of pure indulgence and visible transformation.
                    </p>
                    {/* Magnetic-feel button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/shop"
                            className="group inline-flex items-center gap-3 bg-text-dark text-white px-10 py-4 uppercase tracking-[0.15em] text-sm font-medium hover:bg-secondary transition-all duration-500"
                        >
                            Explore The Collection
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
