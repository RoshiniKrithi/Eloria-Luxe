import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Feather } from 'lucide-react';
import { RevealText, TiltCard, FloatingSparkles } from '../components/common/Effects';

// ── Editorial Data ──────────────────────────
const editorials = [
    {
        id: 1,
        tag: "The Artisan",
        title: "The Perfumer's Hand",
        subtitle: "A Voyage to Grasse",
        excerpt: "In the sun-drenched hills of Provence, a fifth-generation master perfumer still harvests Damask roses by hand at dawn. Each kilo of petals yields a single millilitre of absolute—the liquid gold that defines our signature olfactory journey.",
        body: "The art of perfume extraction at Maison Eloria is a ritual unchanged for over a century. At precisely 4:30 AM, when the dew still clings to each petal, our artisans begin the harvest. The Centifolia rose, exclusive to this microclimate, releases its most potent aroma in these fragile morning hours. Working with enfleurage—an ancient technique using cold fat to absorb fragrance molecules—our perfumer creates an absolute so pure that industry chemists call it 'bottled poetry.' Every 3,600 hand-picked petals produce a single gram of rose absolute, each note carefully orchestrated into our Éclat de Rose and Jardin de Soie collections.",
        image: "/images/journal/perfumer.png",
        readTime: "12 min read",
        date: "March 2026",
        category: "Craftsmanship"
    },
    {
        id: 2,
        tag: "The Terroir",
        title: "Fields of Violet & Gold",
        subtitle: "The Provençal Harvest",
        excerpt: "Every year, for exactly seventeen days between June and July, the lavender fields of Haute-Provence turn into a sea of violet. Our botanical scouts travel 4,000 kilometres to source the rarest varietals for the Eloria Atelier.",
        body: "True lavender—Lavandula angustifolia—grows only above 800 metres in the Alpine foothills of southern France. Unlike commercial lavandin, its molecular structure contains linalyl acetate in concentrations above 45%, giving it a complexity that synthetic alternatives can never reproduce. Our exclusive partnership with three family-owned distilleries in Sault ensures that every drop of essential oil meets the AOC Lavande de Haute-Provence certification. This terroir-driven approach mirrors the philosophy of a grand cru vineyard: the soil, the altitude, and the specific microclimate all leave their signature on the final distillation.",
        image: "/images/journal/lavender.png",
        readTime: "9 min read",
        date: "February 2026",
        category: "Origins"
    },
    {
        id: 3,
        tag: "The Ingredients",
        title: "Alchemy of Rarity",
        subtitle: "Gold, Caviar & Silk",
        excerpt: "The rarest ingredients on Earth converge in a single formulation. 24-karat gold leaf from Kanazawa, Caspian Beluga caviar extract, and Italian silk amino acids create a trinity of regenerative luxury.",
        body: "In the Eloria Research Atelier in Zurich, our biochemists work at the molecular level to unlock the restorative properties of nature's most precious materials. 24-karat gold nanoparticles, measuring just 20 nanometres, penetrate the dermal layer to stimulate collagen synthesis and create a natural luminosity. Caspian Sea caviar, sustainably harvested under strict CITES protocols, provides a unique omega-3 phospholipid complex that mirrors the skin's natural lipid barrier. The final element—Bombyx mori silk proteins—creates an invisible, breathable film that locks in hydration and delivers a soft-focus radiance visible to the naked eye.",
        image: "/images/journal/ingredients.png",
        readTime: "15 min read",
        date: "January 2026",
        category: "Science"
    },
    {
        id: 4,
        tag: "The Laboratory",
        title: "Where Art Meets Science",
        subtitle: "Inside the Eloria Atelier",
        excerpt: "Behind closed doors in Zurich, a team of world-class biochemists and seasoned artisans collaborate to push the boundaries of luxury skincare. Tradition and innovation exist in perfect equilibrium.",
        body: "The Eloria Atelier is where two worlds collide: the precision of Swiss biochemistry and the soul of French artisanal beauty. Our R&D floor houses a cryo-extraction chamber that processes botanical ingredients at -196°C, preserving molecular integrity that traditional heat extraction destroys. Every formulation undergoes 847 stability tests before it earns the Eloria seal. Yet, the final blending is always done by hand—a master formulator who has spent thirty years learning to 'feel' when a texture is perfect. This duality, where algorithmic precision meets human intuition, is the invisible signature behind every Eloria product.",
        image: "/images/journal/laboratory.png",
        readTime: "11 min read",
        date: "December 2025",
        category: "Innovation"
    }
];

// ── Animated Section Components ─────────────
const FadeInSection = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ── Hero Section ────────────────────────────
const JournalHero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={ref} className="relative h-[85vh] overflow-hidden bg-[#0a0a0a]">
            <FloatingSparkles count={20} />
            <motion.div
                style={{ y }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/40 z-10" />

            <motion.div
                style={{ opacity }}
                className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-secondary text-[11px] tracking-[0.4em] uppercase font-medium mb-6"
                >
                    The Eloria Atelier Journal
                </motion.p>
                <h1 className="font-serif text-white leading-[0.9]">
                    <RevealText text="Stories of" className="text-[clamp(3rem,8vw,7rem)] block" delay={0.2} />
                    <RevealText text="Craft & Origin" className="text-[clamp(3rem,8vw,7rem)] italic text-secondary block" delay={0.5} />
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-8 text-white/50 max-w-xl text-lg font-light leading-relaxed"
                >
                    Behind every formulation lies a journey—of hands, of land, of relentless pursuit. These are the chronicles.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="mt-12 flex items-center space-x-2 text-white/30 text-xs tracking-widest uppercase"
                >
                    <Feather size={14} className="text-secondary" />
                    <span>Scroll to explore</span>
                </motion.div>
            </motion.div>
        </section>
    );
};

// ── Asymmetric Editorial Block ──────────────
const EditorialBlock = ({ editorial, index }) => {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section ref={ref} className={`relative py-24 md:py-32 ${index === 0 ? 'mt-0' : ''}`}>
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Category Tag */}
                <FadeInSection>
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-12 h-[1px] bg-secondary" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-secondary font-semibold">{editorial.tag}</span>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400">— {editorial.category}</span>
                    </div>
                </FadeInSection>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${isEven ? '' : 'direction-rtl'}`}>
                    {/* ── Image Column ── */}
                    <FadeInSection
                        className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                        delay={0.2}
                    >
                        <TiltCard>
                            <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl shadow-black/10">
                                {/* Asymmetric Overlap Frame */}
                                <div className={`absolute ${isEven ? '-top-4 -right-4' : '-top-4 -left-4'} w-full h-full border border-secondary/20 rounded-[2rem] z-0 transition-all duration-500 group-hover:top-0 group-hover:right-0 group-hover:left-0`} />

                                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3]">
                                    <motion.img
                                        src={editorial.image}
                                        alt={editorial.title}
                                        className="w-full h-full object-cover scale-105"
                                        style={{ y: imageY }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>

                                {/* Floating Issue Badge */}
                                <div className={`absolute top-8 ${isEven ? 'left-8' : 'right-8'} bg-white/90 backdrop-blur-xl px-5 py-3 rounded-full shadow-xl`}>
                                    <div className="flex items-center space-x-2">
                                        <Calendar size={12} className="text-secondary" />
                                        <span className="text-[10px] tracking-[0.2em] uppercase text-text-dark font-semibold">{editorial.date}</span>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </FadeInSection>

                    {/* ── Text Column ── */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
                        <FadeInSection delay={0.3}>
                            <p className="text-secondary text-xs tracking-[0.3em] uppercase font-semibold">{editorial.subtitle}</p>
                        </FadeInSection>

                        <FadeInSection delay={0.4}>
                            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-text-dark leading-[1.05]">
                                {editorial.title}
                            </h2>
                        </FadeInSection>

                        <FadeInSection delay={0.5}>
                            <div className="w-16 h-[1px] bg-secondary/40" />
                        </FadeInSection>

                        <FadeInSection delay={0.6}>
                            <p className="text-gray-500 text-base leading-[1.9] font-light">
                                {editorial.excerpt}
                            </p>
                        </FadeInSection>

                        <FadeInSection delay={0.7}>
                            <p className="text-gray-400 text-sm leading-[1.9] font-light">
                                {editorial.body.substring(0, 200)}...
                            </p>
                        </FadeInSection>

                        <FadeInSection delay={0.8}>
                            <div className="flex items-center justify-between pt-4">
                                <div className="flex items-center space-x-2 text-gray-400">
                                    <Clock size={14} />
                                    <span className="text-xs tracking-widest uppercase">{editorial.readTime}</span>
                                </div>
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="flex items-center space-x-3 group"
                                >
                                    <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-text-dark group-hover:text-secondary transition-colors">
                                        Read Full Story
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/5 transition-all">
                                        <ArrowRight size={16} className="text-gray-400 group-hover:text-secondary transition-colors" />
                                    </div>
                                </motion.button>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            {index < editorials.length - 1 && (
                <div className="container mx-auto px-6 max-w-7xl mt-24 md:mt-32">
                    <div className="flex items-center space-x-6">
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-3 border border-secondary/30 rotate-45"
                        />
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                    </div>
                </div>
            )}
        </section>
    );
};

// ── Pull Quote Section ──────────────────────
const PullQuote = () => (
    <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <FloatingSparkles count={10} />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <FadeInSection>
                <div className="space-y-8">
                    <div className="flex justify-center">
                        <div className="w-12 h-[1px] bg-secondary/50" />
                    </div>
                    <blockquote className="font-serif text-[clamp(1.8rem,4vw,3rem)] text-white/90 leading-[1.4] italic">
                        "Luxury is not a price. It is a point of view — the culmination of craft, patience, and an unyielding devotion to beauty."
                    </blockquote>
                    <div className="space-y-2">
                        <p className="text-secondary text-sm tracking-[0.3em] uppercase font-medium">Maison Eloria</p>
                        <p className="text-white/30 text-xs tracking-widest uppercase">Founding Manifesto, 1987</p>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-12 h-[1px] bg-secondary/50" />
                    </div>
                </div>
            </FadeInSection>
        </div>
    </section>
);

// ── Newsletter / CTA Section ────────────────
const JournalCTA = () => (
    <section className="py-32 bg-[#fcfbf9]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
            <FadeInSection>
                <p className="text-secondary text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">Stay Informed</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-text-dark leading-tight mb-6">
                    Subscribe to the Atelier Dispatch
                </h2>
                <p className="text-gray-400 text-base font-light mb-10 max-w-lg mx-auto leading-relaxed">
                    Receive exclusive editorials, behind-the-scenes access, and early invitations to limited releases directly in your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-1 h-14 px-6 rounded-full bg-white border border-gray-200 text-sm focus:outline-none focus:border-secondary/50 transition-colors shadow-sm"
                    />
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="h-14 px-10 bg-text-dark text-white rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:bg-secondary transition-colors shadow-xl shadow-black/10"
                    >
                        Subscribe
                    </motion.button>
                </form>
                <p className="text-gray-300 text-[10px] tracking-widest uppercase mt-6">No spam. Unsubscribe anytime.</p>
            </FadeInSection>
        </div>
    </section>
);

// ── Main Journal Page ───────────────────────
const Journal = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#fcfbf9]"
        >
            <JournalHero />

            {/* Editorial Articles */}
            <div className="bg-[#fcfbf9]">
                {editorials.map((editorial, index) => (
                    <EditorialBlock key={editorial.id} editorial={editorial} index={index} />
                ))}
            </div>

            <PullQuote />
            <JournalCTA />
        </motion.div>
    );
};

export default Journal;
