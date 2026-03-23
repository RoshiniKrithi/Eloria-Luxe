import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { ChevronLeft, CreditCard, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

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

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        try {
            // Transform cartItems to match backend Model
            const orderItems = cartItems.map(item => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price
            }));

            // Create initial order in database
            const res = await api.post('/orders', {
                user: formData.email,
                orderItems: orderItems,
                totalPrice: total
            });
            const localOrderId = res.data._id;
            
            // Generate Razorpay Order
            const rzpOrderRes = await api.post('/payment/create-order', {
                amount: total,
                receipt: localOrderId
            });
            
            if (!rzpOrderRes.data.success) {
                toast.error("Failed to initialize payment gateway");
                setIsProcessing(false);
                return;
            }

            const { order } = rzpOrderRes.data;

            // Load Razorpay SDK
            const resScript = await loadRazorpay();
            if (!resScript) {
                toast.error("Razorpay SDK failed to load. Check your connection.");
                setIsProcessing(false);
                return;
            }

            // Options for Razorpay Popup
            console.log("Using Razorpay Key ID:", import.meta.env.VITE_RAZORPAY_KEY_ID);
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
                amount: order.amount,
                currency: order.currency,
                name: "Eloria Luxe",
                description: "Luxury Purchase",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await api.post('/payment/verify', {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: localOrderId
                        });

                        if (verifyRes.data.success) {
                            placeOrder({
                                id: localOrderId,
                                email: formData.email,
                                items: cartItems,
                                total: total,
                                date: new Date().toISOString(),
                                shippingAddress: {
                                    firstName: formData.firstName,
                                    lastName: formData.lastName,
                                    address: formData.address,
                                    city: formData.city,
                                    zipCode: formData.zipCode
                                }
                            });
                            setLastOrderId(localOrderId);
                            setIsOrdered(true);
                            clearCart();
                            toast.success("Payment successful!");
                        } else {
                            toast.error("Payment verification failed");
                        }
                    } catch (error) {
                        toast.error("Payment verification error");
                        console.error(error);
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                },
                theme: {
                    color: "#1a1a1a" // Matches text-dark
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error('Failed to place order:', error);
            toast.error(error.response?.data?.message || error.message || 'An error occurred. Check console.');
        } finally {
            setIsProcessing(false);
        }
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
                    <div className="pt-4 space-y-3">
                        <Link
                            to="/profile"
                            className="block w-full bg-text-dark text-white py-4 rounded-full font-medium tracking-widest uppercase hover:bg-secondary transition-all shadow-xl shadow-secondary/10 text-center"
                        >
                            View My Orders
                        </Link>
                        <Link
                            to="/shop"
                            className="block w-full border border-gray-200 text-text-dark py-4 rounded-full font-medium tracking-widest uppercase hover:border-secondary hover:text-secondary transition-all text-center"
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
                                        <h3 className="text-xl font-serif mb-4">Secure Payment</h3>
                                        <div className="space-y-6">
                                            <div className="bg-gray-50 p-6 rounded-[2rem] border-2 border-secondary/20 flex flex-col items-center justify-center space-y-4 text-center">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                    <ShieldCheck size={32} className="text-secondary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-text-dark">Razorpay Secure Checkout</h4>
                                                    <p className="text-sm text-gray-500 mt-1">You will be securely redirected to complete your payment with Credit Card, UPI, or Netbanking.</p>
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
                                            <span>{step === 1 ? 'Continue to Payment' : 'Pay Now'}</span>
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
