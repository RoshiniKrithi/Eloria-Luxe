import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Star } from 'lucide-react';
import { collections } from '../data/collections';
import { TiltCard, RevealText, FloatingSparkles, Magnetic, ParallaxImage } from '../components/common/Effects';

const Collections = () => {
    const [hoveredId, setHoveredId] = useState(null);

    // Separate featured from the rest
    const featuredCollection = collections.find(c => c.featured && c.id === 'golden-hour-glam');
    const otherCollections = collections.filter(c => c.id !== featuredCollection?.id);

    return (
        <div className="bg-[#fcfbf9] min-h-screen">
            {/* ═══════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════ */}
            <section className="relative h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
                {/* Background */}
                <div className="absolute inset-0">
                    <ParallaxImage
                        src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1920"
                        alt="Collections Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
                </div>

                <FloatingSparkles count={30} />

                {/* Decorative floating elements */}
                <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full pointer-events-none"
                />
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 left-1/5 w-20 h-20 border border-secondary/20 rounded-full pointer-events-none"
                />

                {/* Hero Content */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <span className="inline-flex items-center space-x-2 text-secondary text-sm tracking-[0.3em] uppercase font-semibold">
                            <Sparkles size={14} />
                            <span>Curated For You</span>
                            <Sparkles size={14} />
                        </span>

                        <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.95]">
                            <RevealText text="Our" delay={0.2} /> <span className="italic font-light text-secondary"><RevealText text="Collections" delay={0.4} /></span>
                        </h1>

                        <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Discover thoughtfully curated beauty rituals, each designed to elevate your routine from ordinary to extraordinary.
                        </p>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 80 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="h-[2px] bg-secondary mx-auto"
                        />
                    </motion.div>
                </div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
                >
                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
                    />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════
                FEATURED COLLECTION - SPOTLIGHT
            ═══════════════════════════════════════════════ */}
            {featuredCollection && (
                <section className="py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="text-secondary text-sm tracking-[0.3em] uppercase font-bold">Signature Collection</span>
                        </motion.div>

                        <Link to={`/collections/${featuredCollection.id}`}>
                            <TiltCard>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="group relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden cursor-pointer"
                                >
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <ParallaxImage
                                            src={featuredCollection.image}
                                            alt={featuredCollection.name}
                                            className="group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="p-12 md:p-20 max-w-2xl space-y-6">
                                            <motion.span
                                                className="inline-block px-4 py-1.5 rounded-full border border-secondary/40 text-secondary text-[10px] tracking-[0.3em] uppercase font-medium"
                                            >
                                                {featuredCollection.season}
                                            </motion.span>
                                            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[0.95]">
                                                <RevealText text={featuredCollection.name} delay={0.2} />
                                            </h2>
                                            <p className="text-white/70 text-lg font-light leading-relaxed max-w-lg">
                                                {featuredCollection.description}
                                            </p>
                                            <div className="flex items-center space-x-4 pt-4">
                                                <span className="text-white text-sm font-medium tracking-[0.2em] uppercase group-hover:text-secondary transition-colors duration-500">
                                                    Explore Collection
                                                </span>
                                                <Magnetic>
                                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all duration-500">
                                                        <ArrowUpRight size={20} className="text-white" />
                                                    </div>
                                                </Magnetic>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product count badge */}
                                    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                                            <span className="text-white text-sm font-light">{featuredCollection.productIds.length} Products</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        </Link>
                    </div>
                </section>
            )}

            {/* ═══════════════════════════════════════════════
                COLLECTIONS GRID
            ═══════════════════════════════════════════════ */}
            <section className="pb-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20 space-y-4"
                    >
                        <span className="text-secondary text-sm tracking-[0.3em] uppercase font-bold block">Discover More</span>
                        <h2 className="text-5xl md:text-6xl font-serif text-text-dark">
                            <RevealText text="All" delay={0.1} /> <span className="italic font-light"><RevealText text="Collections" delay={0.3} /></span>
                        </h2>
                        <p className="text-gray-500 font-light max-w-xl mx-auto">
                            Each collection is a curated ritual — a story told through products, designed to transform your beauty routine.
                        </p>
                    </motion.div>

                    {/* Bento-style grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherCollections.map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredId(collection.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                            >
                                <Link to={`/collections/${collection.id}`} className="block h-full">
                                    <TiltCard>
                                        <div className={`group relative overflow-hidden rounded-[2rem] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 ${index === 0 ? 'h-[600px] md:h-full min-h-[500px]' : 'h-[400px]'
                                            }`}>
                                            {/* Image */}
                                            <div className="absolute inset-0">
                                                <ParallaxImage
                                                    src={collection.image}
                                                    alt={collection.name}
                                                    className="group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/90 transition-all duration-500`} />
                                            </div>

                                            {/* Season Tag */}
                                            {collection.season !== 'All Year' && (
                                                <div className="absolute top-6 left-6">
                                                    <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-secondary/90 text-white text-[10px] tracking-[0.2em] uppercase font-medium shadow-lg">
                                                        <Star size={10} fill="currentColor" />
                                                        <span>{collection.season}</span>
                                                    </span>
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                                <div className="space-y-3">
                                                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 block font-medium">
                                                        {collection.tagline}
                                                    </span>
                                                    <h3 className={`font-serif text-white transition-colors duration-300 leading-tight ${index === 0 ? 'text-4xl md:text-5xl' : 'text-3xl'
                                                        }`}>
                                                        {collection.name}
                                                    </h3>

                                                    <AnimatePresence>
                                                        {hoveredId === collection.id && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: 10, height: 0 }}
                                                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                                exit={{ opacity: 0, y: 10, height: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-white/70 font-light text-sm leading-relaxed max-w-md"
                                                            >
                                                                {collection.shortDescription}
                                                            </motion.p>
                                                        )}
                                                    </AnimatePresence>

                                                    <div className="flex items-center justify-between pt-3">
                                                        <div className="flex items-center space-x-3">
                                                            <span className="text-white/50 text-xs font-light">{collection.productIds.length} Products</span>
                                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                                            <span className="text-white/50 text-xs font-light">{collection.season}</span>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                                                            <ArrowUpRight size={16} className="text-white group-hover:text-text-dark transition-colors duration-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                BOTTOM CTA
            ═══════════════════════════════════════════════ */}
            <section className="pb-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden bg-text-dark py-20 px-8 md:px-20 text-center"
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[20rem] font-serif font-bold text-white/[0.02] pointer-events-none select-none italic">
                            EL
                        </div>

                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <span className="text-secondary text-sm tracking-[0.3em] uppercase font-bold">Can't Decide?</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                                Explore Our <span className="italic font-light text-secondary">Full Collection</span>
                            </h2>
                            <p className="text-white/50 font-light leading-relaxed">
                                Browse all our products and build your own personal ritual — your way, your pace, your beauty.
                            </p>
                            <Magnetic>
                                <Link
                                    to="/shop"
                                    className="group relative inline-flex items-center space-x-4 px-10 py-4 overflow-hidden border border-white/20 rounded-full transition-all duration-500 hover:border-secondary"
                                >
                                    <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-text-dark transition-colors duration-500">
                                        Shop All Products
                                    </span>
                                    <div className="absolute inset-0 bg-secondary transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <div className="relative z-10 w-2 h-2 rounded-full bg-secondary group-hover:bg-text-dark transition-colors duration-500" />
                                </Link>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Collections;
