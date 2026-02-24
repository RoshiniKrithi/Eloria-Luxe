import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, User, LogOut, Settings } from 'lucide-react';
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
        { name: 'Best Sellers', path: '/best-sellers' },
        { name: 'About', path: '/about' },
    ];

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
        navigate('/');
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-sm uppercase tracking-widest hover:text-secondary transition-colors duration-300 ${isActive ? 'text-secondary font-medium' : 'text-text-dark'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="hover:text-secondary transition-colors">
                        <Search size={20} strokeWidth={1.5} />
                    </button>
                    <button className="hover:text-secondary transition-colors relative">
                        <Heart size={20} strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>
                    <NavLink to="/cart" className="hover:text-secondary transition-colors relative group">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium"
                            >
                                {itemCount}
                            </motion.span>
                        )}
                    </NavLink>

                    {/* User Profile / Sign In */}
                    {isAuthenticated ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center space-x-2 hover:text-secondary transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-medium">
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                            </button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-gray-100">
                                            <p className="font-medium text-text-dark">{user?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                        </div>
                                        <div className="py-2">
                                            <NavLink
                                                to="/profile"
                                                onClick={() => setShowProfileMenu(false)}
                                                className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm"
                                            >
                                                <User size={16} />
                                                <span>My Profile</span>
                                            </NavLink>
                                            {user?.isAdmin && (
                                                <NavLink to="/admin" className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm">
                                                    <Settings size={16} />
                                                    <span>Admin Panel</span>
                                                </NavLink>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center space-x-2 text-sm text-red-600"
                                            >
                                                <LogOut size={16} />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <NavLink to="/login" className="text-sm uppercase tracking-widest hover:text-secondary transition-colors">
                            Sign In
                        </NavLink>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-dark"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
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
        </nav>
    );
};

export default Navbar;
