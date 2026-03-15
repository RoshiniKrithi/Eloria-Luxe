import React, { useState, useEffect } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { shopProducts } from '../data/products';
import { Plus, X, AlertCircle, CheckCircle, GripVertical, ShoppingBag, Sparkles, Droplets } from 'lucide-react';
import { useCart } from '../context/CartContext';

const getOrderHint = (id) => {
    // ── SKINCARE ──
    if (id === 5) return { index: 1, type: "Exfoliator", hint: "Step 1: Prep & Polish" }; // Quartz Scrub
    if (id === 9) return { index: 2, type: "Hydrator", hint: "Step 2: Water-based Hydration" }; // Glow Drops
    if (id === 1) return { index: 3, type: "Treatment Serum", hint: "Step 3: Active Treatment" }; // Rose Serum
    if (id === 8) return { index: 4, type: "Face Oil", hint: "Step 4: Seal & Nourish" }; // Midnight Oil
    
    // ── HAIRCARE ──
    if (id === 24) return { index: 1, type: "Deep Treatment", hint: "Step 1: Pre-Wash Mask" }; // Caviar Mask
    if (id === 25) return { index: 2, type: "Conditioner", hint: "Step 2: In-Shower Gloss" }; // Aurum Gloss
    if (id === 26) return { index: 3, type: "Bond Repair", hint: "Step 3: Post-Wash Base" }; // Platinum Serum
    if (id === 23) return { index: 4, type: "Hair Oil", hint: "Step 4: Finishing Shine" }; // Silk Infusion Oil
    
    return { index: 5, type: "Cream", hint: "Finishing Touch" };
};

// Filter products for the routine builder
const skincareProducts = shopProducts.filter(p => p.category === 'Skincare');
const haircareProducts = shopProducts.filter(p => p.category === 'Haircare');

const RoutineBuilder = () => {
    const [routine, setRoutine] = useState([]);
    const [activeTab, setActiveTab] = useState('skincare');
    const [isOrderCorrect, setIsOrderCorrect] = useState(true);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Calculate total and discount
    const subtotal = routine.reduce((sum, item) => sum + item.price, 0);
    const isBundle = routine.length >= 3 && isOrderCorrect;
    const discountAmount = isBundle ? subtotal * 0.15 : 0;
    const finalTotal = subtotal - discountAmount;

    // Validate the order of the products whenever the routine changes
    useEffect(() => {
        let correct = true;
        for (let i = 0; i < routine.length - 1; i++) {
            const currentParams = getOrderHint(routine[i].id);
            const nextParams = getOrderHint(routine[i + 1].id);
            if (currentParams.index > nextParams.index) {
                correct = false;
                break;
            }
            
            // Cannot mix categories for order logic
            if (routine[i].category !== routine[i+1].category) {
                correct = false; // mixing skin and hair breaks linear order logic for now
                break;
            }
        }
        setIsOrderCorrect(correct);
    }, [routine]);

    const addToRoutine = (product) => {
        if (!routine.find(p => p.id === product.id)) {
            // Add exactly at the end
            setRoutine(prev => [...prev, product]);
        }
    };

    const removeFromRoutine = (productId) => {
        setRoutine(prev => prev.filter(p => p.id !== productId));
    };

    const addRoutineToBag = () => {
        if (routine.length === 0) return;
        
        routine.forEach(product => {
            addToCart(product, 1);
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#fcfbf9] pt-32 pb-24 font-sans selection:bg-secondary/20 selection:text-secondary">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-secondary font-serif text-sm uppercase tracking-[0.3em] mb-4 block">
                            The Skincare Atelier
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-serif font-medium text-text-dark mb-6 leading-tight">
                            Curate Your <span className="italic">Ritual</span>
                        </h1>
                        <p className="text-gray-500 font-light text-lg leading-relaxed">
                            Drag and drop products onto your vanity shelf to build your perfect morning or evening regimen. 
                            We'll ensure your sequence maximizes absorption and efficacy.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    
                    {/* LEFT COLUMN: The Wardrobe (Available Products) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                            <h2 className="text-2xl font-serif text-text-dark">The Wardrobe</h2>
                            <span className="text-xs uppercase tracking-widest text-gray-400">
                                {activeTab === 'skincare' ? skincareProducts.length : haircareProducts.length} Formulations
                            </span>
                        </div>

                        {/* Category Toggle */}
                        <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 mb-6 relative">
                            <button 
                                onClick={() => setActiveTab('skincare')}
                                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 relative z-10 ${activeTab === 'skincare' ? 'text-white' : 'text-gray-400 hover:text-text-dark'}`}
                            >
                                Skincare
                            </button>
                            <button 
                                onClick={() => setActiveTab('haircare')}
                                className={`flex-1 py-2 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 relative z-10 ${activeTab === 'haircare' ? 'text-white' : 'text-gray-400 hover:text-text-dark'}`}
                            >
                                Haircare
                            </button>
                            {/* Sliding pill background */}
                            <div 
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-text-dark rounded-full transition-transform duration-300 ease-in-out ${activeTab === 'skincare' ? 'translate-x-0' : 'translate-x-[calc(100%+8px)]'}`} 
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
                            {(activeTab === 'skincare' ? skincareProducts : haircareProducts).map((product) => {
                                const inRoutine = routine.some(p => p.id === product.id);
                                return (
                                    <motion.div 
                                        key={product.id}
                                        whileHover={{ scaly: 1.02, x: 5 }}
                                        className={`bg-white rounded-2xl p-4 shadow-sm border transition-all duration-300 flex items-center space-x-4
                                            ${inRoutine ? 'border-secondary/30 opacity-60' : 'border-gray-100 hover:border-secondary/50 hover:shadow-xl hover:shadow-secondary/5'}`}
                                    >
                                        <div className="w-20 h-20 bg-[#fcfbf9] rounded-xl overflow-hidden shadow-inner flex-shrink-0 relative">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            {inRoutine && (
                                                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                                    <CheckCircle className="text-secondary" size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] uppercase tracking-widest text-secondary font-semibold mb-1">{getOrderHint(product.id).type}</p>
                                            <h3 className="font-serif text-text-dark font-medium leading-tight mb-1">{product.name}</h3>
                                            <p className="text-gray-400 text-sm">${product.price.toFixed(2)}</p>
                                        </div>
                                        <button 
                                            onClick={() => !inRoutine && addToRoutine(product)}
                                            disabled={inRoutine}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0
                                                ${inRoutine ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-text-dark border border-gray-200 hover:border-secondary hover:text-secondary hover:bg-white'}`}
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Curated Shelf (Drag and Drop Area) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 min-h-[700px] flex flex-col relative overflow-hidden">
                            
                            {/* Ambient background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                            
                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h2 className="text-3xl font-serif text-text-dark mb-2">Your Vanity Shelf</h2>
                                        <p className="text-gray-500 text-sm font-light">Drag up and down to define your application sequence.</p>
                                    </div>
                                    <div className="bg-secondary/10 text-secondary w-12 h-12 rounded-full flex items-center justify-center">
                                        <Droplets size={20} />
                                    </div>
                                </div>

                                {/* Order Validation Alert */}
                                <AnimatePresence mode="popLayout">
                                    {!isOrderCorrect && routine.length > 1 && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0, y: -20 }}
                                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                                            exit={{ opacity: 0, height: 0, y: -20, transition: { duration: 0.2 } }}
                                            className="bg-red-50/80 border border-red-100 rounded-2xl p-5 mb-8 flex items-start space-x-4 shadow-sm"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <AlertCircle className="text-red-500" size={16} />
                                            </div>
                                            <div>
                                                <h4 className="text-red-900 font-serif text-lg mb-1">Absorption Interrupted</h4>
                                                <p className="text-red-700/80 text-sm font-light leading-relaxed">
                                                    For maximum efficacy, ensure treatments are applied in sequential order. Do not mix Hair and Skin items in a single routine order, or ensure you drag lighter water-based formulations before heavier oils or masks. <strong className="font-medium">Drag the items to reorder them.</strong>
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {isOrderCorrect && routine.length >= 2 && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-green-50/80 border border-green-100 rounded-2xl p-5 mb-8 flex items-start space-x-4 shadow-sm"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Sparkles className="text-green-600" size={16} />
                                            </div>
                                            <div>
                                                <h4 className="text-green-900 font-serif text-lg mb-1">Perfect Harmony</h4>
                                                <p className="text-green-700/80 text-sm font-light leading-relaxed">
                                                    Your sequence is scientifically optimized. As a reward for curating a full routine (3+ items), enjoy a <strong className="font-medium">15% Atelier Bundle Discount</strong>.
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Drag and Drop Area */}
                                <div className="flex-1 relative">
                                    {routine.length === 0 ? (
                                        <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-[#fcfbf9]/50">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                                <ShoppingBag className="text-gray-300" size={24} />
                                            </div>
                                            <p className="font-serif text-xl text-text-dark mb-2">Shelf is Empty</p>
                                            <p className="text-gray-400 text-sm font-light max-w-xs">Select formulations from the wardrobe to begin curating your ritual.</p>
                                        </div>
                                    ) : (
                                        <Reorder.Group 
                                            axis="y" 
                                            values={routine} 
                                            onReorder={setRoutine} 
                                            className="space-y-4"
                                        >
                                            {routine.map((item, index) => (
                                                <Reorder.Item 
                                                    key={item.id} 
                                                    value={item} 
                                                    className="bg-white border border-gray-100 shadow-lg shadow-gray-100/50 p-4 rounded-2xl flex items-center relative z-20 cursor-grab active:cursor-grabbing group hover:border-secondary/30 transition-colors"
                                                >
                                                    <div className="px-2">
                                                        <GripVertical className="text-gray-300 group-hover:text-secondary/60 transition-colors" />
                                                    </div>
                                                    
                                                    <div className="w-16 h-16 bg-primary rounded-xl overflow-hidden flex-shrink-0 mr-4 shadow-sm border border-gray-50">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold flex items-center justify-center">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                                                                {getOrderHint(item.id).hint}
                                                            </span>
                                                        </div>
                                                        <h4 className="font-serif text-lg text-text-dark">{item.name}</h4>
                                                    </div>
                                                    
                                                    <div className="text-right pr-4">
                                                        <p className="font-medium text-text-dark">${item.price.toFixed(2)}</p>
                                                    </div>

                                                    <button 
                                                        onClick={() => removeFromRoutine(item.id)}
                                                        className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>
                                    )}
                                </div>

                                {/* Summary & Actions */}
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <div className="flex justify-between items-end mb-8">
                                        <div>
                                            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Ritual Value</p>
                                            <div className="flex items-center space-x-3">
                                                {isBundle && (
                                                    <span className="text-gray-400 line-through text-lg">${subtotal.toFixed(2)}</span>
                                                )}
                                                <span className="text-3xl font-serif text-text-dark">${finalTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        {isBundle && (
                                            <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold">
                                                -15% Applied
                                            </div>
                                        )}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={addRoutineToBag}
                                        disabled={routine.length === 0 || !isOrderCorrect}
                                        className={`w-full py-5 rounded-full font-serif text-lg tracking-wider flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl
                                            ${routine.length === 0 || !isOrderCorrect 
                                                ? 'bg-gray-100 text-gray-400 shadow-none cursor-not-allowed' 
                                                : isAdded 
                                                    ? 'bg-green-600 text-white shadow-green-200' 
                                                    : 'bg-text-dark text-white hover:bg-secondary shadow-secondary/20'}`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isAdded ? (
                                                <motion.div key="added" initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} className="flex items-center space-x-2">
                                                    <CheckCircle size={20} />
                                                    <span>Ritual Added to Bag</span>
                                                </motion.div>
                                            ) : (
                                                <motion.div key="add" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="flex items-center space-x-2">
                                                    <ShoppingBag size={20} />
                                                    <span>Curate & Add to Bag</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoutineBuilder;
