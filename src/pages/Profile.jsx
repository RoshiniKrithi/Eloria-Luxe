import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { Package, MapPin, User, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const { getOrdersByUser } = useOrders();
    const navigate = useNavigate();

    const userOrders = user ? getOrdersByUser(user.email) : [];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="pt-40 text-center px-6">
                <h2 className="text-3xl font-serif text-text-dark mb-4">Please log in to view your profile</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-text-dark text-white px-8 py-3 rounded-full hover:bg-secondary transition-colors"
                >
                    Log In
                </button>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar / User Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-serif text-gray-400">
                                    {user.name[0]}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-serif text-text-dark">{user.name}</h2>
                                    <p className="text-gray-500 font-light">{user.email}</p>
                                </div>
                                <div className="flex space-x-2 pt-2">
                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] uppercase tracking-widest font-bold rounded-full">Active Member</span>
                                    {user.isAdmin && <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] uppercase tracking-widest font-bold rounded-full">Admin</span>}
                                </div>
                            </div>

                            <div className="mt-10 space-y-2">
                                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-text-dark font-medium">
                                    <User size={20} className="text-gray-400" />
                                    <span>Personal Info</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 text-text-dark font-medium">
                                    <Package size={20} className="text-secondary" />
                                    <span>My Orders</span>
                                </button>
                                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-text-dark font-medium">
                                    <MapPin size={20} className="text-gray-400" />
                                    <span>Address Book</span>
                                </button>
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center space-x-3 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-medium"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content / Order History */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-4xl font-serif text-text-dark mb-8">My Orders</h1>

                            <div className="space-y-6">
                                {userOrders.length === 0 ? (
                                    <div className="bg-white p-12 rounded-[2.5rem] text-center space-y-4 border border-gray-50 shadow-sm">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                            <Package size={32} />
                                        </div>
                                        <h3 className="text-xl font-serif text-text-dark">No orders yet</h3>
                                        <p className="text-gray-500">When you place an order, it will appear here.</p>
                                        <button
                                            onClick={() => navigate('/shop')}
                                            className="inline-block mt-4 text-secondary hover:underline font-medium"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    userOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow group"
                                        >
                                            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Order Number</span>
                                                    <h4 className="text-lg font-medium text-text-dark">#{order.id}</h4>
                                                </div>
                                                <div className="space-y-1 md:text-right">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Placed On</span>
                                                    <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                                <div className="space-y-1 md:text-right">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Status</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                                                        <span className="text-sm font-medium text-secondary">{order.status}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1 md:text-right">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Total Amount</span>
                                                    <p className="text-lg font-medium text-text-dark">${order.total?.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
                                                {order.items?.map((item, idx) => (
                                                    <div key={idx} className="w-16 h-16 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-serif text-gray-300 border border-gray-100">
                                                        {item.name?.[0]}
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="flex items-center space-x-2 text-sm font-medium text-text-dark hover:text-secondary transition-colors group">
                                                <span>View Order Details</span>
                                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
