import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import {
    Package, MapPin, User, LogOut, ChevronDown,
    Truck, CheckCircle, Clock, Gift, ReceiptText,
    ShoppingBag, Calendar, CreditCard, Home, Sparkles,
    ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Status config ──────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    'Processing':       { color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-200',   dot: 'bg-amber-400',   pulse: true  },
    'Confirmed':        { color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-200',    dot: 'bg-blue-400',    pulse: false },
    'Shipped':          { color: 'text-indigo-600',  bg: 'bg-indigo-50',  border: 'border-indigo-200',  dot: 'bg-indigo-400',  pulse: true  },
    'Out for Delivery': { color: 'text-orange-600',  bg: 'bg-orange-50',  border: 'border-orange-200',  dot: 'bg-orange-400',  pulse: true  },
    'Delivered':        { color: 'text-green-700',   bg: 'bg-green-50',   border: 'border-green-200',   dot: 'bg-green-500',   pulse: false },
};

const STEP_ICONS = {
    'Processing':       <ReceiptText size={14} />,
    'Confirmed':        <CheckCircle size={14} />,
    'Shipped':          <Package size={14} />,
    'Out for Delivery': <Truck size={14} />,
    'Delivered':        <Gift size={14} />,
};

// ─── Format date helpers ─────────────────────────────────────────────────────
const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const fmtDateTime = (iso) =>
    new Date(iso).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

// ─── Status Badge ────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Processing'];
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
            {status}
        </span>
    );
};

// ─── Order Timeline ──────────────────────────────────────────────────────────
const OrderTimeline = ({ timeline }) => (
    <div className="relative pt-2">
        {/* Vertical line */}
        <div className="absolute left-[17px] top-0 bottom-0 w-[2px] bg-gray-100" />

        <div className="space-y-5">
            {timeline.map((step, idx) => (
                <motion.div
                    key={step.status}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.07 }}
                    className="flex gap-4 items-start relative"
                >
                    {/* Icon circle */}
                    <div className={`relative z-10 w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center border-2 transition-all
                        ${step.done
                            ? 'bg-[#b8955a] border-[#b8955a] text-white shadow-md shadow-[#b8955a]/30'
                            : 'bg-white border-gray-200 text-gray-300'}`}
                    >
                        {STEP_ICONS[step.status]}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pb-1 ${step.done ? '' : 'opacity-40'}`}>
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className={`text-sm font-semibold ${step.done ? 'text-text-dark' : 'text-gray-400'}`}>
                                {step.label}
                            </p>
                            {step.done && (
                                <p className="text-[10px] text-gray-400 font-medium">
                                    {fmtDateTime(step.date)}
                                </p>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);

// ─── Single Order Card ───────────────────────────────────────────────────────
const OrderCard = ({ order, index }) => {
    const [expanded, setExpanded] = useState(false);

    const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Processing'];
    const totalItems = order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 22 }}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
            {/* Top color accent strip based on status */}
            <div className={`h-1 w-full ${cfg.dot}`} />

            {/* Card header — always visible */}
            <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-4 items-start justify-between mb-5">
                    {/* Order ID + Date */}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Order Number</p>
                        <h4 className="text-lg font-semibold text-text-dark font-mono tracking-wider">#{order.id}</h4>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Placed On</p>
                        <p className="text-sm text-gray-600 font-medium">{fmtDate(order.date)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">Total</p>
                        <p className="text-lg font-semibold text-text-dark">${order.total?.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Status</p>
                        <StatusBadge status={order.status} />
                    </div>
                </div>

                {/* Item previews */}
                <div className="flex items-center gap-3 flex-wrap mb-5">
                    {order.items?.slice(0, 5).map((item, idx) => (
                        <div
                            key={idx}
                            title={item.name}
                            className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-lg font-serif text-[#b8955a] border border-gray-100 flex-shrink-0 shadow-sm"
                        >
                            {item.name?.[0]}
                        </div>
                    ))}
                    {(order.items?.length || 0) > 5 && (
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xs text-gray-400 font-bold border border-gray-100">
                            +{order.items.length - 5}
                        </div>
                    )}
                    <span className="text-sm text-gray-400 ml-2">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                </div>

                {/* Estimated Delivery */}
                {order.status !== 'Delivered' && order.estimatedDelivery && (
                    <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
                        <Calendar size={14} className="text-[#b8955a]" />
                        <span>Estimated Delivery: <span className="font-medium text-text-dark">{fmtDate(order.estimatedDelivery)}</span></span>
                    </div>
                )}
                {order.status === 'Delivered' && (
                    <div className="flex items-center gap-2 mb-5 text-sm text-green-600 font-medium">
                        <CheckCircle size={14} />
                        <span>Delivered on {fmtDate(order.estimatedDelivery || order.date)}</span>
                    </div>
                )}

                {/* Expand toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#b8955a] hover:text-[#9a7a45] transition-colors group"
                >
                    <span>{expanded ? 'Hide Details' : 'View Order Details'}</span>
                    <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={16} />
                    </motion.div>
                </button>
            </div>

            {/* Expandable details */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-gray-100 bg-[#fcfbf9]">
                            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

                                {/* Left: Status Timeline */}
                                <div>
                                    <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5">
                                        Tracking Timeline
                                    </h5>
                                    <OrderTimeline timeline={order.timeline || []} />
                                </div>

                                {/* Right: Items list + Shipping address */}
                                <div className="space-y-8">
                                    {/* Items */}
                                    <div>
                                        <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                            Items Ordered
                                        </h5>
                                        <div className="space-y-3">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-100">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-[#f5f0e8] rounded-xl flex items-center justify-center text-base font-serif text-[#b8955a] flex-shrink-0">
                                                        {item.name?.[0]}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-text-dark truncate">{item.name}</p>
                                                        <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                                                    </div>
                                                    <p className="text-sm font-semibold text-text-dark flex-shrink-0">
                                                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    {order.shippingAddress && (
                                        <div>
                                            <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                                                Shipping Address
                                            </h5>
                                            <div className="flex gap-3 bg-white p-4 rounded-2xl border border-gray-100">
                                                <Home size={16} className="text-[#b8955a] flex-shrink-0 mt-0.5" />
                                                <div className="text-sm text-gray-600 leading-relaxed">
                                                    <p className="font-semibold text-text-dark">
                                                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                                    </p>
                                                    <p>{order.shippingAddress.address}</p>
                                                    <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order total breakdown */}
                                    <div>
                                        <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                                            Price Summary
                                        </h5>
                                        <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-2">
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>Subtotal</span>
                                                <span>${order.total?.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>Shipping</span>
                                                <span className="text-green-600 font-medium">FREE</span>
                                            </div>
                                            <div className="flex justify-between text-sm font-bold text-text-dark pt-2 border-t border-gray-100">
                                                <span>Total Paid</span>
                                                <span>${order.total?.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ─── Personal Info Tab ────────────────────────────────────────────────────────
const PersonalInfoTab = ({ user }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
    >
        <h2 className="text-3xl font-serif text-text-dark">Personal Information</h2>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Full Name</p>
                    <p className="text-base font-medium text-text-dark">{user.name}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</p>
                    <p className="text-base font-medium text-text-dark">{user.email}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Member Since</p>
                    <p className="text-base font-medium text-text-dark">{fmtDate(new Date().toISOString())}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Account Type</p>
                    <p className="text-base font-medium text-text-dark">{user.isAdmin ? 'Administrator' : 'Premium Member'}</p>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 italic">
                    Profile editing and password management coming soon.
                </p>
            </div>
        </div>
    </motion.div>
);

// ─── Orders Tab ───────────────────────────────────────────────────────────────
const OrdersTab = ({ userOrders, navigate }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
    >
        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif text-text-dark">My Orders</h2>
            {userOrders.length > 0 && (
                <span className="text-sm text-gray-400 font-medium">
                    {userOrders.length} order{userOrders.length !== 1 ? 's' : ''}
                </span>
            )}
        </div>

        {userOrders.length === 0 ? (
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-16 text-center space-y-5"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-[#f5f0e8] to-gray-50 rounded-full flex items-center justify-center mx-auto text-[#b8955a]">
                    <ShoppingBag size={36} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-xl font-serif text-text-dark mb-2">No orders yet</h3>
                    <p className="text-gray-400 text-sm">Your luxury purchases will appear here once you place an order.</p>
                </div>
                <button
                    onClick={() => navigate('/shop')}
                    className="inline-flex items-center gap-2 mt-2 bg-text-dark text-white px-8 py-3.5 rounded-full font-medium tracking-wider uppercase text-sm hover:bg-[#b8955a] transition-all shadow-lg shadow-black/10"
                >
                    <Sparkles size={14} />
                    Explore Collection
                </button>
            </motion.div>
        ) : (
            <div className="space-y-5">
                {userOrders.map((order, idx) => (
                    <OrderCard key={order.id} order={order} index={idx} />
                ))}
            </div>
        )}
    </motion.div>
);

// ─── Main Profile Page ────────────────────────────────────────────────────────
const Profile = () => {
    const { user, logout } = useAuth();
    const { getOrdersByUser } = useOrders();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');

    const userOrders = user ? getOrdersByUser(user.email) : [];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className="pt-40 text-center px-6 min-h-screen bg-[#fcfbf9]">
                <div className="max-w-md mx-auto space-y-6">
                    <div className="w-20 h-20 bg-[#f5f0e8] rounded-full flex items-center justify-center mx-auto text-[#b8955a]">
                        <User size={36} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-serif text-text-dark">Please Sign In</h2>
                    <p className="text-gray-400">Log in to view your order history and profile.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-text-dark text-white px-10 py-4 rounded-full hover:bg-[#b8955a] transition-colors font-medium tracking-wider uppercase text-sm shadow-lg"
                    >
                        Log In
                    </button>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'orders',   label: 'My Orders',       icon: <Package size={16} />,  count: userOrders.length },
        { id: 'personal', label: 'Personal Info',    icon: <User size={16} />,     count: null },
    ];

    return (
        <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* ── Sidebar ── */}
                    <div className="lg:col-span-4 space-y-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden relative"
                        >
                            {/* Decorative gradient blob */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#b8955a]/10 to-transparent rounded-full pointer-events-none" />

                            {/* Avatar */}
                            <div className="flex flex-col items-center text-center space-y-4 mb-8">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-br from-[#f5f0e8] to-[#e8dfc8] rounded-full flex items-center justify-center text-4xl font-serif text-[#b8955a] shadow-inner">
                                        {user.name[0].toUpperCase()}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white" title="Active" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-serif text-text-dark">{user.name}</h2>
                                    <p className="text-gray-400 text-sm font-light">{user.email}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] uppercase tracking-widest font-bold rounded-full border border-green-100">
                                        Active Member
                                    </span>
                                    {user.isAdmin && (
                                        <span className="px-3 py-1 bg-[#b8955a]/10 text-[#b8955a] text-[10px] uppercase tracking-widest font-bold rounded-full border border-[#b8955a]/20">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className="bg-[#fcfbf9] rounded-2xl p-4 text-center border border-gray-100">
                                    <p className="text-2xl font-serif text-[#b8955a] font-bold">{userOrders.length}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">Orders</p>
                                </div>
                                <div className="bg-[#fcfbf9] rounded-2xl p-4 text-center border border-gray-100">
                                    <p className="text-2xl font-serif text-[#b8955a] font-bold">
                                        ${userOrders.reduce((s, o) => s + (o.total || 0), 0).toFixed(0)}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">Spent</p>
                                </div>
                            </div>

                            {/* Nav tabs */}
                            <nav className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all font-medium text-sm group
                                            ${activeTab === tab.id
                                                ? 'bg-text-dark text-white shadow-md'
                                                : 'hover:bg-gray-50 text-text-dark'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={activeTab === tab.id ? 'text-[#b8955a]' : 'text-gray-400 group-hover:text-[#b8955a] transition-colors'}>
                                                {tab.icon}
                                            </span>
                                            {tab.label}
                                        </div>
                                        {tab.count !== null && (
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}

                                <div className="pt-4 mt-2 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            </nav>
                        </motion.div>
                    </div>

                    {/* ── Main Content ── */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {activeTab === 'orders' ? (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <OrdersTab userOrders={userOrders} navigate={navigate} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="personal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <PersonalInfoTab user={user} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
