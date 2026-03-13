import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, MessageSquare, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shopProducts } from '../../data/products';

const AtelierAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Welcome to the Eloria Atelier. I am your personal Beauty Concierge. How may I assist you in crafting your perfect ritual today?",
            options: [
                { label: "Radiant Glow Routine", value: "glow" },
                { label: "Nighttime Recovery", value: "recovery" },
                { label: "Flawless Makeup Canvas", value: "makeup" },
                { label: "Find My Signature Scent", value: "scent" }
            ]
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const [inputValue, setInputValue] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const rituals = {
        glow: {
            name: "The Radiant Glow Ritual",
            description: "A curation designed to illuminate and hydrate, leaving your skin with a diamond-like brilliance.",
            products: [1, 9, 12], // Eclat de Rose, Glow Drops, 24K Gold Mask
            response: "For a truly radiant glow, I recommend our 'Luminous Trio'. This ritual combines botanical extracts with advanced hydration."
        },
        recovery: {
            name: "The Night Recovery Ritual",
            description: "Deeply restorative care that works in harmony with your skin's nighttime renewal cycle.",
            products: [8, 24, 26], // Midnight Recovery Oil, Caviar Mask, Platinum Bond Repair
            response: "Nighttime is when the magic happens. This ritual focuses on deep repair and structural integrity."
        },
        makeup: {
            name: "The Velvet Canvas Ritual",
            description: "Prepare your skin for a flawless, long-lasting makeup application with silk-infused formulas.",
            products: [11, 2, 13], // Primer, Foundation, Setting Powder
            response: "The secret to flawless makeup is the canvas beneath. These selections ensure a smooth, soft-focus finish."
        },
        scent: {
            name: "Signature Scent Scouting",
            description: "Identify the olfactory journey that best tells your story.",
            products: [19, 20, 22], // Oud Mystique, Jardin de Soie, Nuit d'Etoiles
            response: "Fragrance is the most intimate form of memory. Here are our most requested olfactory journeys."
        }
    };

    const handleSendMessage = (e) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const text = inputValue.trim();
        setInputValue('');

        // Add user message
        const userMsg = { id: Date.now(), type: 'user', text: text };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);

        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let matchedProducts = [];
            let responseText = "I see you're interested in our bespoke collections. Based on your request, I've curated a selection that might appeal to your taste.";

            // Keyword logic
            if (lowerText.includes('skin') || lowerText.includes('face') || lowerText.includes('dry') || lowerText.includes('glow') || lowerText.includes('acne') || lowerText.includes('aging') || lowerText.includes('wrinkle')) {
                matchedProducts = shopProducts.filter(p => p.category === 'Skincare' || p.category === 'Face').slice(0, 3);
                responseText = "For your skin concerns, I've selected our most advanced botanical treatments designed to nourish and revitalize.";
            } else if (lowerText.includes('fragrance') || lowerText.includes('perfume') || lowerText.includes('scent') || lowerText.includes('smell') || lowerText.includes('mist')) {
                matchedProducts = shopProducts.filter(p => p.category === 'Perfume').slice(0, 3);
                responseText = "Exquisite choice. Our olfactory collections are crafted in France to evoke deep emotion and memory.";
            } else if (lowerText.includes('hair') || lowerText.includes('scalp') || lowerText.includes('shampoo') || lowerText.includes('dandruff') || lowerText.includes('frizz') || lowerText.includes('oil')) {
                matchedProducts = shopProducts.filter(p => p.category === 'Haircare').slice(0, 3);
                responseText = "Our haircare ritual focuses on structural integrity and mirror-like shine. Here is what I recommend for your tresses.";
            } else if (lowerText.includes('makeup') || lowerText.includes('lip') || lowerText.includes('foundation') || lowerText.includes('eyes') || lowerText.includes('blush') || lowerText.includes('rouge')) {
                matchedProducts = shopProducts.filter(p => p.category === 'Makeup' || p.category === 'Face' || p.category === 'Cheeks').slice(0, 3);
                responseText = "To enhance your natural beauty, I've curated these high-pigment, silk-infused essentials.";
            } else if (lowerText.includes('gold') || lowerText.includes('caviar') || lowerText.includes('diamond')) {
                matchedProducts = shopProducts.filter(p => 
                    p.ingredients?.toLowerCase().includes('gold') || 
                    p.ingredients?.toLowerCase().includes('caviar') || 
                    p.ingredients?.toLowerCase().includes('diamond')
                ).slice(0, 3);
                responseText = "You have an eye for the extraordinary. These pieces feature our most precious ingredients.";
            } else {
                // Fallback to trending
                matchedProducts = shopProducts.filter(p => p.isNew).slice(0, 3);
                responseText = "While I ponder your specific request, perhaps you would enjoy exploring our latest arrivals from the Atelier.";
            }

            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: responseText,
                ritual: { 
                    name: "Custom Curation", 
                    description: `Personalized for your interest in "${text}"`,
                    products: matchedProducts.map(p => p.id)
                },
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleOptionClick = (option) => {
        // Add user message
        const userMsg = { id: Date.now(), type: 'user', text: option.label };
        setMessages(prev => [...prev, userMsg]);

        setIsTyping(true);

        setTimeout(() => {
            const ritual = rituals[option.value];
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: ritual.response,
                ritual: ritual,
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    const RitualCard = ({ ritual }) => {
        const ritualProducts = shopProducts.filter(p => ritual.products.includes(p.id));

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-4"
            >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-secondary/20 shadow-sm">
                    <h4 className="font-serif text-secondary text-lg mb-1">{ritual.name}</h4>
                    <p className="text-xs text-gray-500 font-light italic mb-4">{ritual.description}</p>
                    
                    <div className="space-y-3">
                        {ritualProducts.map(product => (
                            <Link 
                                key={product.id} 
                                to={`/product/${product.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-white/80 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-text-dark truncate group-hover:text-secondary transition-colors">{product.name}</p>
                                    <p className="text-[10px] text-gray-400 capitalize">{product.category}</p>
                                </div>
                                <div className="text-xs font-serif text-secondary">${product.price}</div>
                                <ChevronRight size={14} className="text-gray-300 group-hover:text-secondary transition-colors" />
                            </Link>
                        ))}
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setMessages(prev => [...prev.slice(0, 1)]);
                    }}
                    className="text-[10px] tracking-[0.2em] uppercase text-secondary font-bold hover:underline"
                >
                    Start New Consultation
                </button>
            </motion.div>
        );
    };

    return (
        <>
            {/* ═══ Floating Assistant Button ═══ */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative group block"
                >
                    {/* Golden Pulse Animation */}
                    <div className="absolute inset-0 bg-secondary/30 rounded-full animate-ping opacity-75" />
                    
                    <div className="relative w-16 h-16 bg-white/90 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl border border-secondary/20 group-hover:border-secondary transition-colors">
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X className="text-secondary" size={24} />
                                </motion.div>
                            ) : (
                                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                    <Sparkles className="text-secondary" size={24} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Tooltip */}
                    {!isOpen && (
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-text-dark text-white text-[10px] tracking-widest uppercase py-2 px-4 rounded-full pointer-events-none shadow-xl"
                        >
                            Atelier Assistant
                        </motion.div>
                    )}
                </motion.button>
            </div>

            {/* ═══ Chat Window ═══ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-28 right-8 w-[380px] h-[600px] max-h-[80vh] bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50 z-[100] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-secondary/10 bg-gradient-to-r from-secondary/5 to-transparent">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                                    <Bot className="text-secondary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl text-text-dark">The Atelier Concierge</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] tracking-widest uppercase text-gray-400 font-medium">Always available</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-3`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'ml-3 bg-secondary/10' : 'mr-3 bg-gray-100'}`}>
                                            {msg.type === 'user' ? <User size={14} className="text-secondary" /> : <Bot size={14} className="text-gray-400" />}
                                        </div>
                                        <div className="space-y-2">
                                            <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                                                msg.type === 'user' 
                                                ? 'bg-secondary text-white rounded-br-none shadow-lg shadow-secondary/20' 
                                                : 'bg-white text-text-dark border border-gray-100 rounded-bl-none shadow-sm'
                                            }`}>
                                                {msg.text}
                                            </div>

                                            {/* Ritual Results */}
                                            {msg.ritual && <RitualCard ritual={msg.ritual} />}

                                            {/* Options */}
                                            {msg.options && (
                                                <div className="grid grid-cols-1 gap-2 pt-2">
                                                    {msg.options.map((opt, idx) => (
                                                        <motion.button
                                                            key={idx}
                                                            whileHover={{ scale: 1.02, x: 5 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => handleOptionClick(opt)}
                                                            className="text-left p-3 px-4 rounded-xl border border-secondary/20 text-xs font-medium text-text-dark hover:bg-secondary/5 hover:border-secondary transition-all flex items-center justify-between group"
                                                        >
                                                            <span>{opt.label}</span>
                                                            <ChevronRight size={14} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-none flex space-x-1 items-center h-10 px-6">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer Input (Minimalist/Active) */}
                        <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-50 flex items-center space-x-3 bg-white/50">
                             <input 
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Describe your beauty concern..."
                                className="flex-1 h-12 bg-gray-50 rounded-full border border-gray-100 px-5 text-xs text-text-dark focus:outline-none focus:border-secondary/50 transition-colors placeholder:text-gray-400"
                             />
                             <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                className="w-12 h-12 rounded-full bg-text-dark text-white flex items-center justify-center shadow-lg shadow-gray-200"
                             >
                                <Send size={18} />
                             </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AtelierAssistant;
