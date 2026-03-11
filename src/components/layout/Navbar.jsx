import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, User, LogOut, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Logo from '../common/Logo';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
    ];

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate('/');
    };

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-primary/95 backdrop-blur-lg shadow-lg py-4' : 'bg-transparent py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Logo />

                {/* Desktop Menu */}
                <motion.div 
                    className="hidden md:flex space-x-8 items-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                        >
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative text-sm uppercase tracking-widest transition-all duration-300 group ${isActive ? 'text-secondary font-medium' : 'text-text-dark hover:text-secondary'
                                    }`
                                }
                            >
                                {link.name}
                                <motion.div
                                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent"
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                                />
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Icons */}
                <motion.div 
                    className="hidden md:flex items-center space-x-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <motion.button 
                        className="relative group"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Search size={20} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-secondary" />
                        <motion.div
                            className="absolute inset-0 rounded-full bg-secondary/20 scale-0 group-hover:scale-150"
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                    
                    <motion.button 
                        className="relative group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart size={20} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-secondary" />
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium shadow-lg"
                        >
                            0
                        </motion.span>
                    </motion.button>
                    
                    <motion.div className="relative group">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <NavLink to="/cart" className="relative group flex items-center">
                                <ShoppingBag size={20} strokeWidth={1.5} className="transition-colors duration-300 group-hover:text-secondary" />
                                <AnimatePresence>
                                    {itemCount > 0 && (
                                        <motion.span
                                            key={itemCount}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                            className="absolute -top-1 -right-1 bg-gradient-to-r from-secondary to-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium shadow-lg"
                                        >
                                            {itemCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </NavLink>
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 rounded-full bg-secondary/20 scale-0 group-hover:scale-150"
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    {/* User Profile / Sign In */}
                    {isAuthenticated ? (
                        <motion.div 
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        >
                            <motion.button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center space-x-2 hover:text-secondary transition-colors group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div 
                                    className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 flex items-center justify-center text-secondary font-medium shadow-md group-hover:shadow-lg transition-shadow duration-300"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </motion.div>
                            </motion.button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden"
                                    >
                                        <motion.div 
                                            className="p-4 border-b border-gray-100/50 bg-gradient-to-r from-secondary/5 to-accent/5"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <p className="font-medium text-text-dark flex items-center space-x-2">
                                                <Sparkles size={14} className="text-secondary" />
                                                <span>{user?.name}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 truncate mt-1">{user?.email}</p>
                                        </motion.div>
                                        <div className="py-2">
                                            {[
                                                { icon: User, label: 'My Profile', path: '/profile' },
                                                ...(user?.isAdmin ? [{ icon: Settings, label: 'Admin Panel', path: '/admin' }] : []),
                                            ].map((item, index) => (
                                                <motion.div
                                                    key={item.label}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 * (index + 1) }}
                                                >
                                                    <NavLink
                                                        to={item.path}
                                                        onClick={() => setShowProfileMenu(false)}
                                                        className="w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-secondary/10 hover:to-accent/10 transition-all duration-300 flex items-center space-x-2 text-sm group"
                                                    >
                                                        <item.icon size={16} className="transition-colors duration-300 group-hover:text-secondary" />
                                                        <span>{item.label}</span>
                                                    </NavLink>
                                                </motion.div>
                                            ))}
                                            <motion.button
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center space-x-2 text-sm text-red-600 group"
                                            >
                                                <LogOut size={16} className="transition-colors duration-300 group-hover:text-red-700" />
                                                <span>Sign Out</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                        >
                            <NavLink 
                                to="/login" 
                                className="relative text-sm uppercase tracking-widest hover:text-secondary transition-all duration-300 group px-4 py-2 rounded-full border border-secondary/20 hover:border-secondary hover:bg-secondary/10"
                            >
                                Sign In
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 scale-0 group-hover:scale-100"
                                    transition={{ duration: 0.3 }}
                                />
                            </NavLink>
                        </motion.div>
                    )}
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="md:hidden text-text-dark relative group"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileHover={{ scale: 1.1, rotate: isMobileMenuOpen ? 90 : 0 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 180, scale: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: -180, scale: 0 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div
                        className="absolute inset-0 rounded-full bg-secondary/20 scale-0 group-hover:scale-150"
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 w-full bg-primary border-t border-gray-100 shadow-lg overflow-hidden"
                    >
                        <div className="flex flex-col py-6 px-6 space-y-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-serif text-text-dark hover:text-secondary"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="flex justify-between pt-4 border-t border-gray-100">
                                {isAuthenticated ? (
                                    <div className="flex flex-col space-y-4 w-full">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-400">Signed in as</p>
                                            <p className="font-serif text-text-dark">{user?.name}</p>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <NavLink
                                                to="/profile"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-sm font-medium hover:text-secondary"
                                            >
                                                My Profile
                                            </NavLink>
                                            {user?.isAdmin && (
                                                <NavLink
                                                    to="/admin"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-sm font-medium hover:text-secondary"
                                                >
                                                    Admin Panel
                                                </NavLink>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="text-sm text-red-600 text-left font-medium"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <NavLink to="/login" className="text-sm uppercase tracking-widest">Sign In</NavLink>
                                )}
                                <div className="flex space-x-4">
                                    <Search size={20} />
                                    <Heart size={20} />
                                    <NavLink to="/cart"><ShoppingBag size={20} /></NavLink>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
