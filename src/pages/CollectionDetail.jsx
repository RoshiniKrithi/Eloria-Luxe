import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { collections } from '../data/collections';
import { shopProducts } from '../data/products';
import ProductCard from '../components/common/ProductCard';
import { TiltCard, RevealText, FloatingSparkles, Magnetic, ParallaxImage } from '../components/common/Effects';

const CollectionDetail = () => {
    const { id } = useParams();
    const collection = collections.find(c => c.id === id);

    if (!collection) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
                <div className="text-center space-y-6">
                    <div className="text-8xl">✨</div>
                    <h2 className="text-3xl font-serif text-text-dark">Collection Not Found</h2>
                    <p className="text-gray-500 font-light">This collection doesn't exist or may have been removed.</p>
                    <Link
                        to="/collections"
                        className="inline-flex items-center space-x-2 px-8 py-3 bg-text-dark text-white rounded-full hover:bg-secondary transition-colors duration-300"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-medium tracking-wider uppercase">Back to Collections</span>
                    </Link>
                </div>
            </div>
        );
    }

    // Get the actual product objects from the product IDs
    const collectionProducts = collection.productIds
        .map(pid => shopProducts.find(p => p.id === pid))
        .filter(Boolean);

    // Calculate total value of the collection
    const totalValue = collectionProducts.reduce((sum, p) => sum + p.price, 0);

    // Suggest other collections
    const otherCollections = collections.filter(c => c.id !== id).slice(0, 3);

    return (
        <div className="bg-[#fcfbf9] min-h-screen">
            {/* ═══════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════ */}
            <section className="relative h-[65vh] md:h-[75vh] overflow-hidden flex items-end">
                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <ParallaxImage
                        src={collection.image}
                        alt={collection.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                </motion.div>

                <FloatingSparkles count={20} />

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-28 left-6 md:left-12 z-20"
                >
                    <Magnetic strength={0.1}>
                        <Link
                            to="/collections"
                            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-xs tracking-[0.2em] uppercase font-medium">All Collections</span>
                        </Link>
                    </Magnetic>
                </motion.div>

                {/* Hero Content */}
                <div className="relative z-10 w-full pb-16 md:pb-20 px-6">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-3xl space-y-6"
                        >
                            <div className="flex items-center space-x-4">
                                <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full border border-secondary/40 text-secondary text-[10px] tracking-[0.3em] uppercase font-medium">
                                    <Sparkles size={10} />
                                    <span>{collection.season}</span>
                                </span>
                                <span className="text-white/40 text-xs">{collection.productIds.length} Products</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.95]">
                                <RevealText text={collection.name} delay={0.4} />
                            </h1>

                            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                                {collection.tagline}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                ABOUT THE COLLECTION
            ═══════════════════════════════════════════════ */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <span className="text-secondary text-sm tracking-[0.3em] uppercase font-bold">About This Collection</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight">
                                    {collection.tagline}
                                </h2>
                            </div>
                            <p className="text-gray-500 font-light text-lg leading-relaxed">
                                {collection.description}
                            </p>
                            <div className="flex items-center space-x-8 pt-4">
                                <div className="space-y-1">
                                    <span className="text-3xl font-serif text-text-dark">{collection.productIds.length}</span>
                                    <span className="block text-xs text-gray-400 tracking-[0.2em] uppercase">Products</span>
                                </div>
                                <div className="w-[1px] h-12 bg-gray-200" />
                                <div className="space-y-1">
                                    <span className="text-3xl font-serif text-text-dark">${totalValue.toFixed(0)}</span>
                                    <span className="block text-xs text-gray-400 tracking-[0.2em] uppercase">Combined Value</span>
                                </div>
                                <div className="w-[1px] h-12 bg-gray-200" />
                                <div className="space-y-1">
                                    <span className="text-3xl font-serif text-secondary">♥</span>
                                    <span className="block text-xs text-gray-400 tracking-[0.2em] uppercase">Curated</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} rounded-[3rem] transform rotate-3`} />
                            <div className="relative bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-100/50">
                                <div className="grid grid-cols-2 gap-4">
                                    {collectionProducts.slice(0, 4).map((product, idx) => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * idx }}
                                            className="aspect-square rounded-2xl overflow-hidden bg-gray-50"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">{collection.name} — {collection.productIds.length} essentials</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                PRODUCTS IN THIS COLLECTION
            ═══════════════════════════════════════════════ */}
            <section className="pb-28">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 space-y-4"
                    >
                        <span className="text-secondary text-sm tracking-[0.3em] uppercase font-bold block">The Edit</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-text-dark">
                            What's <span className="italic font-light">Inside</span>
                        </h2>
                        <p className="text-gray-500 font-light max-w-lg mx-auto">
                            Every piece in this collection was hand-selected to work beautifully together.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {collectionProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
                OTHER COLLECTIONS
            ═══════════════════════════════════════════════ */}
            <section className="pb-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 space-y-4"
                    >
                        <span className="text-secondary text-sm tracking-[0.3em] uppercase font-bold block">Keep Exploring</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-text-dark">
                            More <span className="italic font-light">Collections</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {otherCollections.map((col, index) => (
                            <motion.div
                                key={col.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link to={`/collections/${col.id}`} className="block h-full">
                                    <TiltCard>
                                        <div className="group relative h-[350px] rounded-[2rem] overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
                                            <ParallaxImage
                                                src={col.image}
                                                alt={col.name}
                                                className="group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                                <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 block mb-2">{col.tagline}</span>
                                                <h3 className="text-2xl font-serif text-white">{col.name}</h3>
                                                <span className="text-white/40 text-xs mt-2">{col.productIds.length} Products</span>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CollectionDetail;
