import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const categories = [
    { name: "Skincare", slug: "skincare", description: "Elevate your rituals", color: "bg-rose-50", icon: "S", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600" },
    { name: "Makeup", slug: "makeup", description: "Artistry unleashed", color: "bg-amber-50", icon: "M", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=600" },
    { name: "Fragrance", slug: "fragrance", description: "Scent of luxury", color: "bg-purple-50", icon: "F", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" },
    { name: "Haircare", slug: "haircare", description: "Strength & Shine", color: "bg-emerald-50", icon: "H", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600" },
];

const CategoryCard = ({ cat, index }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
        >
            <Link to={`/category/${cat.slug}`} className="block w-full h-full">
                {/* Background Image with Parallax */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-40, 40]) }}
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                >
                    <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-2 block">Collection</span>
                    <h3 className="text-3xl font-serif font-bold text-white transition-colors duration-300 lowercase tracking-tighter">
                        {cat.name}
                    </h3>
                    <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 ease-in-out">
                        <p className="text-white/80 mt-4 font-light text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {cat.description}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center text-white font-medium text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                        <span>Explore</span>
                        <ArrowUpRight size={14} className="ml-2" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

const Categories = () => {
    return (
        <section className="py-32 bg-[#fcfbf9] relative overflow-hidden">
            {/* Decorative background text */}
            <div className="absolute top-20 -right-20 text-[20rem] font-serif font-bold text-gray-200/20 pointer-events-none select-none italic">
                Rituals
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-6 md:space-y-0">
                    <div className="space-y-4 max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-secondary text-sm tracking-[0.3em] uppercase font-bold"
                        >
                            The Essentials
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl font-serif text-text-dark leading-tight"
                        >
                            Shop by <span className="italic font-light">Category</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link to="/collections" className="group flex items-center space-x-3 text-text-dark font-medium tracking-widest text-sm uppercase">
                            <span className="relative">
                                View All Collections
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300" />
                            </span>
                            <div className="w-10 h-10 rounded-full border border-text-dark/10 flex items-center justify-center group-hover:bg-text-dark group-hover:text-white transition-all duration-300">
                                <ArrowUpRight size={18} />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <CategoryCard key={cat.slug} cat={cat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
