import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    { id: 1, name: "Jessica R.", review: "Absolutely stunning products. The packaging is a work of art and the quality is unmatched.", role: "Verified Buyer" },
    { id: 2, name: "Sophia L.", review: "My skin has never felt this soft. It truly is luxury in a bottle.", role: "Beauty Editor" },
    { id: 3, name: "Emily C.", review: "Fast shipping and the unboxing experience was magical.", role: "Influencer" },
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-[#fcfbf9] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-secondary text-sm tracking-[0.2em] uppercase font-semibold">Love Notes</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-text-dark">What They Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testi, index) => (
                        <motion.div
                            key={testi.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-8 rounded-[2rem] bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-secondary/20 relative"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 -left-4 text-secondary/10 text-8xl font-serif font-black select-none pointer-events-none">"</div>

                            <div className="flex space-x-1 mb-6 text-secondary">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>

                            <p className="text-lg text-gray-600 font-light italic leading-relaxed mb-6">
                                {testi.review}
                            </p>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-text-dark font-serif font-bold">
                                    {testi.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-medium text-text-dark">{testi.name}</h4>
                                    <span className="text-xs text-gray-400 uppercase tracking-widest">{testi.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
