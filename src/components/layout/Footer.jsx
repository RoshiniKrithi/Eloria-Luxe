import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
    return (
        <footer className="bg-text-dark text-white pt-24 pb-12">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm leading-relaxed tracking-wide">

                {/* Brand */}
                <div className="space-y-6">
                    <Logo light={true} />
                    <p className="text-gray-400 font-light">
                        Creating timeless beauty through science and art. Ethically sourced, cruelty-free, and designed for the modern muse.
                    </p>
                    <div className="flex space-x-4 pt-4">
                        <Facebook size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                        <Twitter size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                        <Instagram size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                        <Linkedin size={20} className="text-gray-400 hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>

                {/* Links */}
                <div className="space-y-6">
                    <h4 className="text-secondary font-medium tracking-widest uppercase text-xs">Shop</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
                        <li><Link to="/collections" className="hover:text-white transition-colors">New Arrivals</Link></li>
                        <li><Link to="/bestsellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
                        <li><Link to="/gift-cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-secondary font-medium tracking-widest uppercase text-xs">Company</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                        <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                        <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h4 className="text-secondary font-medium tracking-widest uppercase text-xs">Legal</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mt-20 border-t border-gray-800 pt-8 text-center text-xs text-gray-500 font-light flex flex-col md:flex-row justify-between items-center container mx-auto px-6">
                <p>&copy; {new Date().getFullYear()} Eloria Luxe. All rights reserved.</p>
                <div className="flex items-center space-x-1 mt-4 md:mt-0">
                    <span>Designed with</span>
                    <Heart size={12} fill="currentColor" className="text-red-500 mx-1" />
                    <span>by Antigravity</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
