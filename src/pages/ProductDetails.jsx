import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Minus, Plus, Heart, Share2, ShoppingBag, CheckCircle, ChevronRight, Sparkles, Droplets, Shield, Truck, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { shopProducts } from '../data/products';
import api from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [wasAdded, setWasAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('features');
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Try API first
                const { data } = await api.get(`/products/${id}`);
                const localMatch = shopProducts.find(p => String(p.id) === String(id) || String(p._id) === String(id));
                setProduct({
                    ...data,
                    rating: data.rating || 4.8,
                    reviews: data.reviews || 120,
                    description: data.description || "Experience the ultimate in skin perfection.",
                    longDescription: data.longDescription || localMatch?.longDescription || "",
                    features: data.features || localMatch?.features || [],
                    ingredients: data.ingredients || localMatch?.ingredients || "",
                    howToUse: data.howToUse || localMatch?.howToUse || "",
                });
                setLoading(false);
            } catch (error) {
                // Fallback to local data
                const localProduct = shopProducts.find(p => String(p.id) === String(id));
                if (localProduct) {
                    setProduct(localProduct);
                }
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="pt-40 text-center min-h-screen bg-[#fcfbf9]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                    <p className="text-gray-400 font-serif tracking-widest text-sm uppercase">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pt-40 text-center min-h-screen bg-[#fcfbf9]">
                <div className="flex flex-col items-center space-y-6">
                    <p className="text-2xl font-serif text-text-dark">Product not found</p>
                    <Link to="/shop" className="text-secondary hover:underline tracking-wider uppercase text-sm">
                        ← Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setWasAdded(true);
        setTimeout(() => setWasAdded(false), 2000);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    const tabs = [
        { id: 'features', label: 'Features' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'howToUse', label: 'How to Use' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="pt-28 pb-24 bg-[#fcfbf9] min-h-screen"
        >
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-10 flex items-center text-sm text-gray-400 font-light"
                >
                    <Link to="/" className="hover:text-text-dark transition-colors">Home</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to="/shop" className="hover:text-text-dark transition-colors">Shop</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-secondary font-medium">{product.category}</span>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-text-dark font-medium truncate max-w-[200px]">{product.name}</span>
                </motion.div>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* ═══ Image Gallery ═══ */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2.5rem] overflow-hidden group shadow-xl shadow-gray-200/50">
                            {/* Product Image */}
                            <motion.img
                                src={product.image}
                                alt={product.name}
                                onLoad={() => setImageLoaded(true)}
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: imageLoaded ? 1 : 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient Overlay at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

                            {/* Tag */}
                            {product.isNew && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.3 }}
                                    className="absolute top-6 left-6 bg-secondary text-white text-[10px] tracking-[0.15em] px-4 py-1.5 rounded-full uppercase font-semibold shadow-lg shadow-secondary/30"
                                >
                                    New Arrival
                                </motion.span>
                            )}

                            {/* Wishlist & Share */}
                            <div className="absolute top-6 right-6 flex flex-col space-y-3">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white/80 backdrop-blur-md rounded-full text-text-dark hover:text-red-500 hover:bg-white transition-all shadow-lg"
                                >
                                    <Heart size={20} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-3 bg-white/80 backdrop-blur-md rounded-full text-text-dark hover:text-secondary hover:bg-white transition-all shadow-lg"
                                >
                                    <Share2 size={20} />
                                </motion.button>
                            </div>

                            {/* Brand Badge */}
                            <div className="absolute bottom-6 left-6">
                                <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
                                    <Sparkles size={14} className="text-secondary" />
                                    <span className="text-[10px] tracking-[0.15em] uppercase font-semibold text-text-dark">{product.brand}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ═══ Product Info ═══ */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8 lg:py-4"
                    >
                        {/* Category */}
                        <p className="text-xs tracking-[0.25em] uppercase text-secondary font-semibold">{product.category}</p>

                        {/* Name */}
                        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-text-dark leading-tight -mt-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 text-secondary">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1.5} />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm font-light">({product.reviews} Reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline space-x-3">
                            <span className="text-3xl font-serif text-text-dark">${product.price.toFixed(2)}</span>
                            <span className="text-sm text-gray-400 font-light">Tax included</span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-secondary/30 via-secondary/10 to-transparent" />

                        {/* Short Description */}
                        <p className="text-gray-500 leading-relaxed font-light text-lg">
                            {product.longDescription || product.description}
                        </p>

                        {/* Quantity & Actions */}
                        <div className="space-y-5 pt-2">
                            {/* Quantity Selector */}
                            <div>
                                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-gray-400">Quantity</h4>
                                <div className="inline-flex items-center border border-gray-200 rounded-full px-2 h-14 justify-between bg-white shadow-sm">
                                    <button onClick={() => handleQuantityChange('dec')} className="p-2.5 hover:text-secondary transition-colors rounded-full hover:bg-gray-50">
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-medium text-lg w-12 text-center">{quantity}</span>
                                    <button onClick={() => handleQuantityChange('inc')} className="p-2.5 hover:text-secondary transition-colors rounded-full hover:bg-gray-50">
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Add to Bag */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    className={`flex-1 h-14 rounded-full font-medium tracking-[0.15em] uppercase text-sm transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 group ${wasAdded
                                        ? 'bg-green-600 text-white shadow-green-200/50'
                                        : 'bg-white text-text-dark border-2 border-text-dark hover:bg-text-dark hover:text-white shadow-gray-100'
                                        }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {wasAdded ? (
                                            <motion.span key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center space-x-2">
                                                <CheckCircle size={18} />
                                                <span>Added to Bag</span>
                                            </motion.span>
                                        ) : (
                                            <motion.span key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center space-x-2">
                                                <ShoppingBag size={18} />
                                                <span>Add to Bag</span>
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                {/* Buy Now */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleBuyNow}
                                    className="flex-1 h-14 rounded-full font-medium tracking-[0.15em] uppercase text-sm bg-text-dark text-white hover:bg-secondary transition-all duration-500 shadow-xl shadow-secondary/10 flex items-center justify-center space-x-2"
                                >
                                    <span>Buy Now</span>
                                    <ChevronRight size={18} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            {[
                                { icon: <Truck size={18} />, text: "Free Shipping" },
                                { icon: <Shield size={18} />, text: "Authentic Product" },
                                { icon: <Droplets size={18} />, text: "Cruelty Free" },
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center text-center space-y-2 py-3 px-2 rounded-2xl bg-white/60 border border-gray-100">
                                    <span className="text-secondary">{badge.icon}</span>
                                    <span className="text-[10px] tracking-wider uppercase text-gray-500 font-medium">{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ═══ Detailed Info Tabs ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mt-24 max-w-5xl mx-auto"
                >
                    {/* Tab Headers */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg shadow-gray-100 border border-gray-100">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-8 py-3 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-text-dark text-white shadow-lg'
                                        : 'text-gray-400 hover:text-text-dark'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'features' && (
                            <motion.div
                                key="features"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {product.features && product.features.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {product.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500"
                                            >
                                                <div className="absolute top-0 left-6 -translate-y-1/2">
                                                    <span className="inline-block bg-[#fcfbf9] px-3 py-0.5 text-[10px] tracking-[0.2em] uppercase text-secondary font-semibold">
                                                        {feature.label}
                                                    </span>
                                                </div>
                                                <p className="text-text-dark font-serif text-lg mt-2 group-hover:text-secondary transition-colors duration-300">
                                                    {feature.value}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center font-light italic">Feature details coming soon.</p>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'ingredients' && (
                            <motion.div
                                key="ingredients"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-3xl mx-auto"
                            >
                                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg shadow-gray-50">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                            <Droplets size={18} className="text-secondary" />
                                        </div>
                                        <h3 className="font-serif text-xl text-text-dark">Full Ingredient List</h3>
                                    </div>
                                    {product.ingredients ? (
                                        <div className="flex flex-wrap gap-2">
                                            {product.ingredients.split(',').map((ingredient, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                                    className="inline-block bg-[#fcfbf9] border border-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-light hover:border-secondary/30 hover:text-secondary transition-all duration-300 cursor-default"
                                                >
                                                    {ingredient.trim()}
                                                </motion.span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 font-light italic">Ingredient list coming soon.</p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'howToUse' && (
                            <motion.div
                                key="howToUse"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="max-w-3xl mx-auto"
                            >
                                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-lg shadow-gray-50">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                                            <Sparkles size={18} className="text-secondary" />
                                        </div>
                                        <h3 className="font-serif text-xl text-text-dark">Application Guide</h3>
                                    </div>
                                    {product.howToUse ? (
                                        <div className="space-y-4">
                                            {product.howToUse.split('.').filter(s => s.trim()).map((step, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                                    className="flex items-start space-x-4 group"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-sm font-semibold group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-gray-600 font-light leading-relaxed pt-1">
                                                        {step.trim()}.
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 font-light italic">Usage instructions coming soon.</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ═══ You May Also Like ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="mt-28"
                >
                    <div className="text-center mb-12">
                        <p className="text-xs tracking-[0.25em] uppercase text-secondary font-semibold mb-3">Curated For You</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-text-dark">You May Also Love</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {shopProducts
                            .filter(p => p.category === product.category && p.id !== product.id)
                            .slice(0, 4)
                            .concat(
                                shopProducts.filter(p => p.category !== product.category && p.id !== product.id).slice(0, Math.max(0, 4 - shopProducts.filter(p => p.category === product.category && p.id !== product.id).length))
                            )
                            .slice(0, 4)
                            .map((relatedProduct, idx) => (
                                <motion.div
                                    key={relatedProduct.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <Link
                                        to={`/product/${relatedProduct.id}`}
                                        className="group block"
                                    >
                                        <div className="relative aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden mb-4 shadow-md shadow-gray-100 group-hover:shadow-xl group-hover:shadow-gray-200/60 transition-all duration-500">
                                            <img
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            {relatedProduct.isNew && (
                                                <span className="absolute top-3 left-3 bg-secondary text-white text-[8px] tracking-widest px-2 py-0.5 rounded-full uppercase font-semibold">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="font-serif text-sm text-text-dark group-hover:text-secondary transition-colors duration-300 truncate">{relatedProduct.name}</h4>
                                        <p className="text-xs text-gray-400 mt-1 font-light">${relatedProduct.price.toFixed(2)}</p>
                                    </Link>
                                </motion.div>
                            ))}
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default ProductDetails;
