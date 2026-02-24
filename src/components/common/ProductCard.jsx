import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative bg-[#fcfbf9] rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-gray-200 transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-secondary/10"
        >
            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative aspect-[4/5]  bg-gray-100/50 flex items-center justify-center overflow-hidden">
                    {/* Fallback pattern if no image */}
                    {!product.image ? (
                        <div className="w-full h-full bg-gradient-to-tr from-[#f3e7e9] to-[#dad4ec] opacity-50 flex items-center justify-center text-text-dark/10 font-serif text-6xl">
                            {product.name.substring(0, 2).toUpperCase()}
                        </div>
                    ) : (
                        <img src={product.image} alt={product.name} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out" />
                    )}

                    {/* Tag */}
                    {product.isNew && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 left-4 bg-secondary text-white text-[10px] tracking-widest px-3 py-1 rounded-full uppercase font-medium shadow-md"
                        >
                            New
                        </motion.span>
                    )}
                </div>
            </Link>

            {/* Overlay Icons */}
            <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-accent hover:text-white transition-colors shadow-md"
                >
                    <Heart size={18} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToCart}
                    className={`backdrop-blur-md p-3 rounded-full transition-all shadow-md ${isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-white/80 hover:bg-text-dark hover:text-white'
                        }`}
                >
                    <ShoppingBag size={18} />
                </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 text-center space-y-2">
                <div className="flex justify-center items-center space-x-1 text-secondary text-xs">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < product.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                    ))}
                    <span className="text-gray-400 ml-1">({product.reviews})</span>
                </div>

                <h3 className="font-serif text-xl text-text-dark group-hover:text-secondary transition-colors duration-300">
                    <Link to={`/product/${product.id}`} className="block">{product.name}</Link>
                </h3>

                <p className="text-sm text-gray-500 uppercase tracking-wide font-light">{product.category}</p>

                <div className="pt-2 font-medium text-lg text-text-dark">
                    ${product.price.toFixed(2)}
                </div>
            </div>

            {/* Added to Cart Notification */}
            {isAdded && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 right-4 bg-green-500 text-white text-xs py-2 px-4 rounded-full text-center font-medium shadow-lg"
                >
                    ✓ Added to cart!
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProductCard;
