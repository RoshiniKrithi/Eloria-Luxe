import { Minus, Plus, X, ArrowRight, User, ShoppingBag as ShoppingBagIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, total } = useCart();
    const { isAuthenticated } = useAuth();

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 1) {
            updateQuantity(id, newQuantity);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <ShoppingBagIcon size={48} className="text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-serif text-text-dark">Your Cart is Empty</h2>
                    <p className="text-gray-500 max-w-md">Looks like you haven't added anything to your cart yet. Start shopping!</p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-text-dark text-white rounded-full hover:bg-secondary transition-colors shadow-xl shadow-secondary/10"
                    >
                        <span>Continue Shopping</span>
                        <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-serif text-text-dark mb-12"
                >
                    Shopping Cart
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, height: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-secondary/10"
                                >
                                    <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center text-3xl font-serif text-gray-300">
                                        {item.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-serif text-xl text-text-dark mb-1 truncate">{item.name}</h3>
                                        <p className="text-gray-500 font-light text-sm">{item.category}</p>
                                        <p className="text-secondary font-medium mt-2">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="p-1 hover:text-secondary transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="p-1 hover:text-secondary transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="text-xl font-medium text-text-dark w-24 text-right">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                                    >
                                        <X size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <Link
                            to="/shop"
                            className="inline-flex items-center space-x-2 text-text-dark hover:text-secondary transition-colors font-medium"
                        >
                            <span>← Continue Shopping</span>
                        </Link>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-[2rem] shadow-lg sticky top-32 border border-gray-50"
                        >
                            <h2 className="text-2xl font-serif text-text-dark mb-8">Order Summary</h2>
                            <div className="space-y-4 mb-8 text-base text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                    <span className="font-medium">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-100 font-medium text-text-dark text-xl">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Checkout Buttons */}
                            <div className="space-y-4">
                                {isAuthenticated ? (
                                    <Link
                                        to="/checkout"
                                        className="w-full bg-text-dark text-white py-4 rounded-full font-medium tracking-widest uppercase hover:bg-secondary transition-all duration-300 shadow-xl shadow-secondary/10 flex items-center justify-center space-x-2 group"
                                    >
                                        <span>Proceed to Checkout</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="w-full block bg-text-dark text-white py-4 rounded-full font-medium tracking-widest uppercase hover:bg-secondary transition-all duration-300 shadow-xl shadow-secondary/10 text-center"
                                        >
                                            Sign In to Checkout
                                        </Link>
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-200"></div>
                                            </div>
                                            <div className="relative flex justify-center text-xs uppercase">
                                                <span className="bg-white px-2 text-gray-400 tracking-widest">Or</span>
                                            </div>
                                        </div>
                                        <Link
                                            to="/checkout"
                                            className="w-full border-2 border-text-dark text-text-dark py-4 rounded-full font-medium tracking-widest uppercase hover:bg-text-dark hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
                                        >
                                            <User size={18} />
                                            <span>Guest Checkout</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-3">
                                <p className="text-xs text-gray-400 flex items-center justify-center space-x-2">
                                    <span>🔒</span>
                                    <span>Secure Checkout by Stripe</span>
                                </p>
                                <div className="flex justify-center space-x-2 text-xs text-gray-400">
                                    <span>✓ Free Shipping</span>
                                    <span>•</span>
                                    <span>✓ 30-Day Returns</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
