import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { shopProducts } from '../data/products';
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "What feeling do you want your fragrance to evoke?",
    subtitle: "Select the mood that best captures your essence.",
    options: [
      { id: 'mystery', label: 'Power & Mystery', desc: 'A commanding presence that leaves a lasting impression.' },
      { id: 'airy', label: 'Light & Airy Elegance', desc: 'A delicate, luminous aura that feels effortless.' },
      { id: 'warm', label: 'Warm & Comforting', desc: 'A rich, enveloping embrace of familiarity.' },
      { id: 'cool', label: 'Cool & Sophisticated', desc: 'A crisp, enchanting charm that sparkles.' },
    ]
  },
  {
    id: 2,
    title: "Where are you wearing this fragrance?",
    subtitle: "The perfect scent complements the setting.",
    options: [
      { id: 'gala', label: 'A Glamorous Evening Gala', desc: 'Opulent and dramatic settings.' },
      { id: 'garden', label: 'A Sun-drenched Garden Party', desc: 'Bright, open daytime gatherings.' },
      { id: 'fireside', label: 'A Cozy Winter Fireside', desc: 'Intimate, warm, and inviting spaces.' },
      { id: 'stroll', label: 'A Crisp Midnight Stroll', desc: 'Reflective, cool, and enchanting moments.' },
    ]
  },
  {
    id: 3,
    title: "Which scent notes are you naturally drawn to?",
    subtitle: "Your olfactory signature.",
    options: [
      { id: 'woods', label: 'Smoky Woods & Leather', desc: 'Deep, earthy, and intense notes.' },
      { id: 'florals', label: 'Delicate White Florals', desc: 'Soft petals and blooming gardens.' },
      { id: 'spice', label: 'Sweet Vanilla & Spice', desc: 'Gourmand, golden, and sweet notes.' },
      { id: 'musk', label: 'Fresh Greens & Musk', desc: 'Clean, airy, and crystalline notes.' },
    ]
  }
];

const ScentFinder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (optionId) => {
    setAnswers({ ...answers, [currentStep]: optionId });
    
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400);
    } else {
      calculateResult({ ...answers, [currentStep]: optionId });
    }
  };

  const calculateResult = (finalAnswers) => {
    setIsCalculating(true);
    
    // Simulate calculation time for premium feel
    setTimeout(() => {
      const mood = finalAnswers[0];
      const setting = finalAnswers[1];
      const notes = finalAnswers[2];
      
      let productId;
      let fragranceProfile = "";

      // Determine Product Strategy
      // Count occurrences of each fragrance profile mapping
      let points = { oud: 0, soie: 0, ambre: 0, etoiles: 0 };
      
      // Mood mapping
      if (mood === 'mystery') points.oud += 2;
      else if (mood === 'airy') points.soie += 2;
      else if (mood === 'warm') points.ambre += 2;
      else if (mood === 'cool') points.etoiles += 2;

      // Setting mapping
      if (setting === 'gala') points.oud += 1;
      else if (setting === 'garden') points.soie += 1;
      else if (setting === 'fireside') points.ambre += 1;
      else if (setting === 'stroll') points.etoiles += 1;

      // Notes mapping
      if (notes === 'woods') points.oud += 2;
      else if (notes === 'florals') points.soie += 2;
      else if (notes === 'spice') points.ambre += 2;
      else if (notes === 'musk') points.etoiles += 2;

      // Find the highest score
      const maxScore = Math.max(points.oud, points.soie, points.ambre, points.etoiles);
      if (maxScore === points.oud) {
        productId = 19; // Oud Mystique
        fragranceProfile = "Woody Oriental Intense";
      } else if (maxScore === points.soie) {
        productId = 20; // Jardin de Soie
        fragranceProfile = "Luminous Floral Musky";
      } else if (maxScore === points.ambre) {
        productId = 21; // L'Ambre Royal
        fragranceProfile = "Warm Regal Amber";
      } else {
        productId = 22; // Nuit d'Étoiles
        fragranceProfile = "Fresh Woody Floral";
      }
      
      const product = shopProducts.find(p => p.id === productId);

      setResult({
        product,
        fragranceProfile,
        message: "Your Signature Scent Found."
      });
      setIsCalculating(false);
    }, 2800);
  };

  const restartQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-primary pt-32 pb-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-serif text-sm uppercase tracking-[0.3em] mb-4 block">
              Atelier Services
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-text-dark mb-4">
              Discover Your Signature Scent
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Our bespoke fragrance profiler analyzes your olfactory desires to match you with your perfect Eloria Luxe parfum.
            </p>
          </motion.div>
        </div>

        {/* Main Quiz Area */}
        <div className="relative bg-white/50 backdrop-blur-md border border-white/20 shadow-xl rounded-3xl p-8 md:p-12 min-h-[500px] flex flex-col justify-center overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isCalculating && !result && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest mb-2 font-serif">
                    <span>Step {currentStep + 1}</span>
                    <span>{questions.length}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary"
                      initial={{ width: `${(currentStep / questions.length) * 100}%` }}
                      animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-serif text-text-dark mb-3">
                    {questions[currentStep].title}
                  </h2>
                  <p className="text-gray-500">
                    {questions[currentStep].subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentStep].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={`text-left p-6 rounded-2xl border transition-all duration-300 group
                        ${answers[currentStep] === option.id 
                          ? 'border-secondary bg-secondary/5 ring-1 ring-secondary' 
                          : 'border-white/40 bg-white/40 hover:border-secondary/40 hover:bg-white'}
                      `}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={`font-serif text-lg ${answers[currentStep] === option.id ? 'text-secondary' : 'text-text-dark group-hover:text-secondary'}`}>
                          {option.label}
                        </h3>
                        {answers[currentStep] === option.id && <Check size={18} className="text-secondary" />}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {option.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {currentStep > 0 && (
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="flex items-center space-x-2 text-sm text-gray-400 hover:text-text-dark transition-colors uppercase tracking-widest"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {isCalculating && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-6 py-20"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-2 border-primary border-t-secondary border-b-secondary rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-secondary animate-pulse" size={20} />
                  </div>
                </div>
                <div className="text-center font-serif text-lg text-text-dark animate-pulse">
                  Curating your olfactory profile...
                </div>
              </motion.div>
            )}

            {result && !isCalculating && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center flex flex-col items-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-6">
                  <Sparkles size={32} />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-serif text-text-dark mb-2">
                  {result.message}
                </h2>
                
                <p className="text-xl text-secondary font-serif italic mb-8">
                  Profile: {result.fragranceProfile}
                </p>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-sm w-full mb-8 text-left group flex items-start space-x-4">
                  <div className="w-24 h-24 bg-primary rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={result.product?.image} 
                      alt={result.product?.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2">
                    <span className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-sans">{result.product?.category}</span>
                    <h3 className="text-lg font-serif text-text-dark group-hover:text-secondary transition-colors mb-2">
                      {result.product?.name}
                    </h3>
                    <p className="text-secondary font-sans font-medium">${result.product?.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => navigate(`/product/${result.product?.id}`)}
                    className="bg-text-dark text-white px-8 py-4 rounded-full font-serif tracking-wider hover:bg-secondary transition-colors w-full sm:w-auto flex items-center justify-center space-x-2"
                  >
                    <span>Discover Scent</span>
                    <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={restartQuiz}
                    className="bg-transparent text-text-dark border-2 border-text-dark px-8 py-4 rounded-full font-serif tracking-wider hover:border-secondary hover:text-secondary transition-colors w-full sm:w-auto"
                  >
                    Retake Journey
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default ScentFinder;
