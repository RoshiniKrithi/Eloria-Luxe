import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { ChevronLeft, CreditCard, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, total, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);
    const [lastOrderId, setLastOrderId] = useState(null);

    const [formData, setFormData] = useState({
        email: user?.email || '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < 2) setStep(step + 1);
        else handlePlaceOrder();
    };

    const handlePlaceOrder = () => {
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            const order = placeOrder({
                items: cartItems,
                total: total,
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode
                },
                email: formData.email,
                userId: user?.id || null
            });

            setLastOrderId(order.id);
            setIsProcessing(false);
            setIsOrdered(true);
            clearCart();
        }, 3000);
    };

    if (isOrdered) {
        return (
            <div className="pt-32 pb-24 bg-primary min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center space-y-8"
                >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-serif text-text-dark">Thank You!</h2>
                        <div className="space-y-2">
                            <p className="text-gray-500">Your order has been placed successfully.</p>
                            <p className="text-sm font-medium text-text-dark uppercase tracking-widest">Order #{lastOrderId}</p>
                        </div>
                        <p className="text-sm text-gray-400">We'll send you a confirmation email shortly.</p>
                    </div>
                    <div className="pt-4">
                        <Link
                            to="/shop"
                            className="block w-full bg-text-dark text-white py-4 rounded-full font-medium tracking-widest uppercase hover:bg-secondary transition-all shadow-xl shadow-secondary/10"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0 && !isOrdered) {
        return (
            <div className="pt-40 text-center">
                <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
                <Link to="/shop" className="text-secondary hover:underline">Return to shop</Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex items-center space-x-4 mb-12">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-4xl font-serif text-text-dark">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Checkout Steps & Form */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Steps Indicator */}
                        <div className="flex items-center justify-between px-4 max-w-md">
                            <div className="flex flex-col items-center space-y-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 1 ? 'bg-text-dark text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <Truck size={20} />
                                </div>
                                <span className={`text-xs font-medium uppercase tracking-widest ${step >= 1 ? 'text-text-dark' : 'text-gray-400'}`}>Shipping</span>
                            </div>
                            <div className={`flex-1 h-[2px] mx-4 ${step >= 2 ? 'bg-text-dark' : 'bg-gray-200'}`} />
                            <div className="flex flex-col items-center space-y-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${step >= 2 ? 'bg-text-dark text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <CreditCard size={20} />
                                </div>
                                <span className={`text-xs font-medium uppercase tracking-widest ${step >= 2 ? 'text-text-dark' : 'text-gray-400'}`}>Payment</span>
                            </div>
                        </div>

                        <form onSubmit={handleNext} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-6"
                                    >
                                        <h3 className="text-xl font-serif mb-4">Shipping Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 col-span-2">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                    placeholder="alex@example.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">First Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">Last Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2 col-span-2">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">Street Address</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">City</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">Zip Code</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-6"
                                    >
                                        <h3 className="text-xl font-serif mb-4">Payment Details</h3>
                                        <div className="space-y-6">
                                            <div className="bg-gray-100 p-6 rounded-[2rem] flex items-center justify-between border-2 border-secondary/20">
                                                <div className="flex items-center space-x-4">
                                                    <CreditCard className="text-secondary" />
                                                    <span className="font-medium">Credit / Debit Card</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <div className="w-8 h-5 bg-gray-300 rounded" />
                                                    <div className="w-8 h-5 bg-gray-300 rounded" />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">Card Number</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                        placeholder="0000 0000 0000 0000"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">Expiry Date</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            name="expiry"
                                                            value={formData.expiry}
                                                            onChange={handleInputChange}
                                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-widest">CVC</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            name="cvc"
                                                            value={formData.cvc}
                                                            onChange={handleInputChange}
                                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                                                            placeholder="123"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex justify-between items-center pt-6">
                                {step === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-gray-500 hover:text-text-dark font-medium transition-colors"
                                    >
                                        Back to Shipping
                                    </button>
                                )}
                                <div className={step === 1 ? 'w-full' : ''}>
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`w-full md:w-auto px-12 py-4 bg-text-dark text-white rounded-full font-medium tracking-widest uppercase hover:bg-secondary transition-all shadow-xl shadow-secondary/10 flex items-center justify-center space-x-3 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </>
                                        ) : (
                                            <span>{step === 1 ? 'Continue to Payment' : 'Complete Order'}</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg sticky top-32 border border-gray-50 space-y-8">
                            <h3 className="text-2xl font-serif text-text-dark">Order Summary</h3>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center font-serif text-gray-400">
                                            {item.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-text-dark truncate">{item.name}</h4>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-medium text-text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium font-sans">FREE</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-gray-100 font-medium text-text-dark text-xl">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
                                <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                                    <ShieldCheck size={16} className="text-secondary" />
                                    <span>Secure checkout guaranteed</span>
                                </div>
                                <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                                    <Truck size={16} className="text-secondary" />
                                    <span>Free delivery on all orders</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
