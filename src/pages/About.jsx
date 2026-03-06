import { motion } from 'framer-motion';
import { Sparkles, Leaf, Beaker, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        playsInline={true}
                        className="w-full h-full object-cover opacity-70"
                    >
                        <source src="https://videos.pexels.com/video-files/856973/856973-hd_1920_1080_24fps.mp4" type="video/mp4" />
                    </video>
                    {/* A subtle dark overlay to ensure the gold text still pops perfectly against the glitter */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif text-text-dark mb-6"
                    >
                        The Art of <br /><span className="italic text-secondary">Timeless Beauty</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-lg text-gray-800 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm"
                    >
                        We believe that true luxury lies in the harmony of nature's purest elements and cutting-edge scientific innovation.
                    </motion.p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-24 px-6 md:px-12">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <img
                                src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1400&auto=format&fit=crop"
                                alt="Our Formulation Process"
                                className="w-full h-auto aspect-[4/5] object-cover rounded-sm shadow-2xl"
                            />
                        </motion.div>
                        <motion.div {...fadeIn} className="space-y-8">
                            <h2 className="text-sm tracking-[0.2em] text-secondary uppercase font-medium">Our Story</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight">
                                Born from a desire for <span className="italic">uncompromised</span> excellence.
                            </h3>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed text-lg">
                                <p>
                                    Eloria Luxe began with a simple yet profound realization: the modern muse refuses to choose between clinical efficacy and a luxurious sensory experience.
                                </p>
                                <p>
                                    Our founder spent over a decade working alongside master botanists and elite biochemists in Switzerland, meticulously studying how rare, sustainably harvested botanicals interact with advanced skin-identical active ingredients.
                                </p>
                                <p>
                                    The result is a collection of unparalleled formulations—each a masterpiece designed to rejuvenate, protect, and illuminate your natural radiance without compromise.
                                </p>
                            </div>
                            <div className="pt-6">
                                <p className="font-serif italic text-4xl text-secondary/80">Eleanor Vane</p>
                                <p className="text-xs tracking-widest uppercase text-gray-400 mt-2 font-medium">Eleanor Vane, Founder</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-white px-6 md:px-12">
                <div className="container mx-auto max-w-6xl">
                    <motion.div {...fadeIn} className="text-center mb-16">
                        <h2 className="text-sm tracking-[0.2em] text-secondary uppercase font-medium mb-4">Our Philosophy</h2>
                        <h3 className="text-3xl md:text-4xl font-serif text-text-dark">The Pillars of Eloria Luxe</h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: <Sparkles className="w-6 h-6" />, title: "Clinical Efficacy", desc: "Formulated with clinically proven active ingredients at optimal concentrations for visible results." },
                            { icon: <Leaf className="w-6 h-6" />, title: "Botanical Purity", desc: "Sourcing only the highest-grade, organic plant extracts that provide profound nourishment." },
                            { icon: <Globe className="w-6 h-6" />, title: "Ethical Sourcing", desc: "We partner directly with transparent, sustainable farms to ensure fair trade and zero exploitation." },
                            { icon: <Beaker className="w-6 h-6" />, title: "Cruelty Free", desc: "We are firmly against animal testing. Our products are tested rigorously on human volunteers only." },
                        ].map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="space-y-4 text-center md:text-left group p-6 hover:bg-primary/30 rounded-xl transition-colors duration-500"
                            >
                                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-500 mx-auto md:mx-0">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-serif text-text-dark">{value.title}</h4>
                                <p className="text-gray-500 font-light text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sustainability / The Ingredients */}
            <section className="py-24 px-6 md:px-12 relative overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row-reverse">

                        <motion.div {...fadeIn} className="space-y-8 md:pl-12 order-1 md:order-2">
                            <h2 className="text-sm tracking-[0.2em] text-secondary uppercase font-medium">Sustainability</h2>
                            <h3 className="text-4xl md:text-5xl font-serif text-text-dark leading-tight">
                                Beauty that respects the <span className="italic">Earth</span>.
                            </h3>
                            <div className="space-y-4 text-gray-600 font-light leading-relaxed text-lg">
                                <p>
                                    As part of our commitment to the planet, Eloria Luxe packaging is meticulously designed to be 100% recyclable. We utilize heavy-weight glass vessels that preserve the integrity of our formulations while sharply reducing single-use plastics.
                                </p>
                                <p>
                                    Our secondary packaging is crafted from FSC-certified paper, printed with eco-friendly, vegetable-based inks. We firmly believe that true luxury should never come at the expense of our environment.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div {...fadeIn} className="relative order-2 md:order-1 mt-12 md:mt-0">
                            <div className="absolute inset-0 bg-secondary/10 translate-x-6 translate-y-6 rounded-sm"></div>
                            <img
                                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1400&auto=format&fit=crop"
                                alt="Sustainable Packaging"
                                className="w-full h-auto shadow-xl aspect-square object-cover rounded-sm relative z-10"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-text-dark text-white text-center px-6">
                <motion.div {...fadeIn} className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-5xl font-serif italic">Discover Your Ritual</h2>
                    <p className="text-gray-300 font-light leading-relaxed text-lg">
                        Elevate your everyday skincare routine into a moment of pure indulgence and visible transformation.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block bg-white text-text-dark px-10 py-4 uppercase tracking-[0.15em] text-sm font-medium hover:bg-secondary hover:text-white transition-all transform hover:scale-105 duration-300"
                    >
                        Explore The Collection
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default About;
