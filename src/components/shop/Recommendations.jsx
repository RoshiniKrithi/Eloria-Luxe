import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Heart, ChevronRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { getAIRecommendations } from '../../services/recommendationService';

const Recommendations = ({ currentProductId, category }) => {
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        const recommendations = getAIRecommendations(currentProductId, 4);
        setRecommended(recommendations);
    }, [currentProductId]);

    if (recommended.length === 0) return null;

    return (
        <section className="mt-32 relative py-12">
            {/* AI Glow background effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-gradient-to-b from-secondary/5 to-transparent blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 bg-text-dark text-white px-4 py-2 rounded-full shadow-lg shadow-black/10"
                        >
                            <BrainCircuit size={16} className="text-secondary animate-pulse" />
                            <span className="text-[10px] tracking-[0.2em] uppercase font-bold">AI Recommended</span>
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight">
                            Customers <span className="text-secondary italic">also loved...</span>
                        </h2>
                        <p className="text-gray-500 font-light max-w-xl text-lg">
                            Based on purchase patterns and beauty preferences, we think these will complement your {category?.toLowerCase()} routine perfectly.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2 text-text-dark font-medium tracking-widest uppercase text-xs border-b-2 border-secondary/30 pb-1 hover:border-secondary transition-all"
                    >
                        <span>View All Favorites</span>
                        <ChevronRight size={14} />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommended.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative"
                        >
                            {/* Smart Badge */}
                            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                                <span className="bg-white/90 backdrop-blur-md text-[#b8860b] text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-secondary/20 shadow-sm flex items-center space-x-1">
                                    <Sparkles size={8} />
                                    <span>Smart Match</span>
                                </span>
                            </div>

                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* Aesthetic Detail: Connection line */}
                <div className="mt-20 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>
        </section>
    );
};

export default Recommendations;
