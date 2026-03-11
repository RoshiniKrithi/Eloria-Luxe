import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            className="group relative bg-[#fcfbf9] rounded-[2rem] overflow-hidden border border-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            whileHover={{ 
                scale: 1.03,
                boxShadow: "0 25px 50px rgba(212, 175, 55, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(212, 175, 55, 0.2)"
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <Link to={`/product/${product._id || product.id}`} className="block">
                <div className="relative aspect-[4/5]  bg-gray-100/50 flex items-center justify-center overflow-hidden">
                    {/* Fallback pattern if no image */}
                    {!product.image ? (
                        <div className="w-full h-full bg-gradient-to-tr from-[#f3e7e9] to-[#dad4ec] opacity-50 flex items-center justify-center text-text-dark/10 font-serif text-6xl">
                            {product.name.substring(0, 2).toUpperCase()}
                        </div>
                    ) : (
                        <motion.img 
                            src={product.image} 
                            alt={product.name} 
                            className="object-cover w-full h-full"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
                        />
                    )}

                    {/* Tag */}
                    {product.isNew && (
                        <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute top-4 left-4 bg-gradient-to-r from-secondary to-accent text-white text-[10px] tracking-widest px-3 py-1 rounded-full uppercase font-medium shadow-lg flex items-center space-x-1"
                        >
                            <Sparkles size={10} className="animate-pulse" />
                            <span>New</span>
                        </motion.span>
                    )}
                </div>
            </Link>

            {/* Overlay Icons */}
            <motion.div 
                className="absolute top-4 right-4 flex flex-col space-y-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                <motion.button
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-secondary hover:to-accent hover:text-white transition-all duration-300"
                >
                    <Heart size={18} className="transition-transform duration-300" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className={`backdrop-blur-md p-3 rounded-full shadow-lg transition-all duration-300 ${isAdded
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        : 'bg-white/90 hover:bg-gradient-to-r hover:from-text-dark hover:to-secondary hover:text-white'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isAdded ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <Sparkles size={18} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="bag"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <ShoppingBag size={18} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            {/* Content */}
            <motion.div 
                className="p-6 text-center space-y-2"
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
                <motion.div 
                    className="flex justify-center items-center space-x-1 text-secondary text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1 * i, type: "spring", stiffness: 150 }}
                        >
                            <Star size={12} fill={i < product.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                        </motion.div>
                    ))}
                    <span className="text-gray-400 ml-1">({product.reviews})</span>
                </motion.div>

                <motion.h3 
                    className="font-serif text-xl text-text-dark"
                    whileHover={{ color: "#d4af37" }}
                    transition={{ duration: 0.3 }}
                >
                    <Link to={`/product/${product._id || product.id}`} className="block hover:text-secondary transition-colors duration-300">{product.name}</Link>
                </motion.h3>

                <p className="text-sm text-gray-500 uppercase tracking-wide font-light">{product.category}</p>

                <motion.div 
                    className="pt-2 font-medium text-lg text-text-dark"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    ${(product.price || 0).toFixed(2)}
                </motion.div>
            </motion.div>

            {/* Added to Cart Notification */}
            <AnimatePresence>
                {isAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs py-3 px-4 rounded-full text-center font-medium shadow-xl backdrop-blur-md border border-white/20"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <Sparkles size={12} className="animate-pulse" />
                            <span>✓ Added to cart!</span>
                            <Sparkles size={12} className="animate-pulse" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductCard;
