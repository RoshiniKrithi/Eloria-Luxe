import { useState, useEffect } from 'react';
import ProductCard from '../common/ProductCard';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const Featured = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await api.get('/products');
                // Slice top 4 for featured
                setFeaturedProducts(data.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching featured products:", error);
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.5em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                        viewport={{ once: true }}
                        className="text-secondary text-sm uppercase font-bold block"
                    >
                        Our Favorites
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-6xl font-serif text-text-dark"
                    >
                        Featured Collection
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="h-[2px] bg-secondary mx-auto mt-6"
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
                >
                    {featuredProducts.map((product) => (
                        <motion.div key={product._id || product.id} variants={itemVariants}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <Link to="/shop" className="group relative inline-flex items-center space-x-4 px-10 py-4 overflow-hidden border border-text-dark/10 rounded-full transition-all duration-500 hover:border-text-dark">
                        <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-500">View All Products</span>
                        <div className="absolute inset-0 bg-text-dark transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-[20] transition-transform duration-700" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Featured;
