import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-32 relative bg-text-dark overflow-hidden flex items-center justify-center">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90 transition-opacity duration-300">
                {/* Fallback pattern */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30 pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center text-white space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-secondary text-sm tracking-[0.3em] uppercase font-semibold block mb-4">Stay Connected</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-light mb-6">Join the Inner Circle</h2>
                    <p className="text-gray-400 max-w-lg mx-auto leading-relaxed text-lg font-light tracking-wide mb-10">
                        Subscribe to receive exclusive offers, new product announcements, and beauty secrets directly to your inbox.
                    </p>

                    <form className="max-w-md mx-auto relative flex items-center border-b border-gray-600 focus-within:border-white transition-colors duration-300">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full bg-transparent py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-lg tracking-wide font-light"
                        />
                        <button type="submit" className="text-white hover:text-secondary transition-colors p-2">
                            <ArrowRight size={24} strokeWidth={1.5} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
