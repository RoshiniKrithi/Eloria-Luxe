import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/common/ProductCard';
import api from '../services/api';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectCategory] = useState("All");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ["All", "Skincare", "Makeup", "Face", "Cheeks"];

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    if (loading) {
        return (
            <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-secondary text-sm tracking-[0.2em] uppercase font-semibold">Discover</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-text-dark mt-3 mb-6">Our Collection</h1>
                    <p className="text-gray-500 font-light max-w-xl mx-auto">
                        Browse our curated selection of luxury cosmetics, each crafted to perfection
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-12 py-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-secondary transition-all flex items-center space-x-2 text-sm">
                            <SlidersHorizontal size={18} />
                            <span>Filters</span>
                        </button>
                        <button className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-secondary transition-all flex items-center space-x-2 text-sm">
                            <span>Sort By</span>
                            <ChevronDown size={18} />
                        </button>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex space-x-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-text-dark text-white shadow-lg'
                                : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-text-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 font-light">
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
