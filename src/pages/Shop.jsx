import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/common/ProductCard';
import { shopProducts } from '../data/products';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get initial category from URL or default to "All"
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get("category") || "All";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState("");

    // Sync state if URL changes (e.g., clicking category from home page)
    useEffect(() => {
        const queryCategory = new URLSearchParams(location.search).get("category");
        if (queryCategory) {
            setSelectedCategory(queryCategory);
        } else {
            setSelectedCategory("All");
        }
    }, [location.search]);

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        // Update URL to reflect selected category
        if (cat === "All") {
            navigate("/shop");
        } else {
            navigate(`/shop?category=${cat}`);
        }
    };
    const [sortBy, setSortBy] = useState("default");
    const [showSortMenu, setShowSortMenu] = useState(false);

    const categories = ["All", "Skincare", "Makeup", "Face", "Cheeks", "Perfume", "Haircare"];

    const filteredProducts = useMemo(() => {
        let result = shopProducts;

        // Filter by category
        if (selectedCategory !== "All") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (sortBy) {
            case "price-low":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result = [...result].sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            default:
                break;
        }

        return result;
    }, [selectedCategory, searchQuery, sortBy]);

    const sortOptions = [
        { label: "Default", value: "default" },
        { label: "Price: Low to High", value: "price-low" },
        { label: "Price: High to Low", value: "price-high" },
        { label: "Top Rated", value: "rating" },
        { label: "Newest First", value: "newest" },
    ];

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
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4"
                >
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-12 py-4 rounded-full bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Sort By Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSortMenu(!showSortMenu)}
                                className="px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-secondary transition-all flex items-center space-x-2 text-sm"
                            >
                                <span>Sort By</span>
                                <ChevronDown size={18} className={`transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {showSortMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                        transition={{ duration: 0.18 }}
                                        className="absolute right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 min-w-[200px] overflow-hidden"
                                    >
                                        {sortOptions.map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                                                className={`block w-full text-left px-5 py-2.5 text-sm transition-colors ${sortBy === opt.value
                                                    ? 'bg-secondary/10 text-secondary font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Category Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex space-x-3 mb-12 overflow-x-auto pb-4 scrollbar-hide"
                >
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-text-dark text-white shadow-lg shadow-gray-300/40'
                                : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-text-dark border border-gray-100'
                                }`}
                        >
                            {cat}
                            {selectedCategory === cat && (
                                <span className="ml-2 text-xs opacity-70">
                                    ({cat === "All" ? shopProducts.length : shopProducts.filter(p => p.category === cat).length})
                                </span>
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Product Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory + sortBy + searchQuery}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProducts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">✨</div>
                        <p className="text-gray-500 font-light text-lg">No products found matching your search.</p>
                        <button
                            onClick={() => { setSearchQuery(""); handleCategoryClick("All"); }}
                            className="mt-4 px-6 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Shop;
