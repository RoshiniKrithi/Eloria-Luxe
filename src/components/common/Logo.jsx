import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", light = false }) => {
    return (
        <Link to="/" className={`group flex items-center gap-3 ${className}`}>
            {/* Monogram Icon */}
            <div className="relative flex items-center justify-center">
                <motion.div
                    className={`w-10 h-10 border ${light ? 'border-white/20' : 'border-secondary/30'} rounded-full flex items-center justify-center relative overflow-hidden group-hover:border-secondary transition-colors duration-500`}
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <span className="text-secondary font-serif text-xl tracking-tighter z-10 font-bold">EL</span>

                    {/* Shimmer Effect */}
                    <motion.div
                        className={`absolute inset-x-0 h-[1px] ${light ? 'bg-white/10' : 'bg-secondary/20'} top-1/2 -rotate-45 scale-x-150`}
                        animate={{ translateX: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* Subtle Dot */}
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(212,163,115,0.6)]" />
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
                <h1 className={`text-2xl font-serif font-bold tracking-[0.25em] ${light ? 'text-white' : 'text-text-dark'} group-hover:text-secondary transition-colors duration-500 leading-none`}>
                    ELORIA
                </h1>
                <span className={`text-[10px] tracking-[0.55em] uppercase text-gray-400 group-hover:${light ? 'text-white' : 'text-text-dark'} transition-colors duration-500 mt-1 pl-0.5`}>
                    LUXE
                </span>
            </div>
        </Link>
    );
};

export default Logo;
