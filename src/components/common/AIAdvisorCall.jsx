import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, MicOff, PhoneOff, Volume2 } from 'lucide-react';

// Smart AI Response Engine
const getAIResponse = (input) => {
    const text = input.toLowerCase();
    
    // Helper function to match base words, allowing suffixes (e.g. 'pigment' matches 'pigmentation')
    const hasWords = (wordsStr) => {
        const words = wordsStr.split('|');
        // Match word boundaries at the start, but allow suffixes at the end
        return words.some(w => new RegExp(`\\b${w}`, 'i').test(text));
    };

    // Helper for exact matches to prevent short words from misfiring
    const hasExact = (wordsStr) => {
        const words = wordsStr.split('|');
        return words.some(w => new RegExp(`\\b${w}\\b`, 'i').test(text));
    };

    if (hasWords('dry|hydrate|hydrated|hydration|moisture|dehydrated|flaky')) {
        return "I hear you, dryness can be really challenging. I'd recommend our Hyaluronic Glow Drops. It hydrates at three distinct skin depths for lasting plumpness. Pair it with our Midnight Recovery Oil for a nourishing overnight treatment.";
    }
    if (hasWords('acne|pimple|pimples|breakout|breakouts|oily|sebum|pores|blackheads')) {
        return "For acne-prone skin, I recommend our Eclat de Rose Serum with niacinamide to regulate sebum. Follow with our Diamond Quartz Scrub twice a week to keep pores clear.";
    }
    if (hasWords('aging|wrinkle|wrinkles|firm|firmness|fine lines|old|mature|sagging')) {
        return "For anti-aging, try our 24-Karat Gold Face Mask weekly to firm skin with gold leaf and collagen peptides. Use our Vitamin C Bright Serum every morning to boost collagen.";
    }
    if (hasWords('bright|brightening|dark spot|dark spots|glow|dull|tan|pigmentation|hyperpigmentation|discoloration|uneven')) {
        return "For pigmentation and brightness, our Vitamin C Bright Serum with ferulic acid is your best ally. Add our Diamond Quartz Scrub twice a week to reveal radiant skin.";
    }
    if (hasWords('hair|frizz|frizzy|damage|damaged|shine|curl|curls|split ends')) {
        return "For hair care, our Platinum Bond Repair Serum rebuilds broken hair bonds. Pair with Silk Infusion Hair Oil for frizz control and mirror-like shine.";
    }
    if (hasWords('perfume|fragrance|scent|smell|cologne')) {
        return "For fragrances, our Oud Mystique Parfum lasts 12 hours with agarwood and damask rose. For something lighter, try Jardin de Soie with white jasmine.";
    }
    if (hasWords('sensitive|redness|irritation|irritated|calm')) {
        return "For sensitive skin, try our Midnight Recovery Oil with chamomile and lavender. Our Hyaluronic Glow Drops also soothes reactive skin beautifully.";
    }
    
    // UNSUPPORTED CONCERN HANDLING with helpful tips - Checked BEFORE generic help
    if (hasWords('eczema|dermatitis|rash|allergy')) {
        return "While we don't currently have products specifically formulated for eczema or severe rashes, I recommend keeping your showers lukewarm, avoiding harsh generic soaps, and looking for medical-grade colloidal oatmeal creams. For your daily routine, stick to extremely minimal, fragrance-free hydration.";
    }
    if (hasWords('psoriasis')) {
        return "We don't carry specific treatments for psoriasis at Eloria Luxe. However, gentle exfoliation using salicylic acid products from a pharmacy, combined with heavy, fragrance-free emollients, can be very helpful. It's always best to consult a dermatologist for targeted care.";
    }
    if (hasWords('rosacea')) {
        return "Eloria Luxe doesn't currently offer a dedicated rosacea line. To help manage flare-ups, try to avoid hot water, spicy foods, and direct sun exposure. Look for gentle, azelaic acid-based products elsewhere, and always use a high-quality mineral sunscreen.";
    }
    if (hasWords('dandruff|flake|flakes|scalp')) {
        return "We don't specialize in dandruff treatments at this time. I suggest looking for a targeted shampoo containing zinc pyrithione or ketoconazole. In the meantime, try to avoid washing your hair with very hot water, as that can further dry out your scalp.";
    }
    if (hasWords('hair loss|thinning|bald')) {
        return "While our products are wonderful for strengthening hair, we don't offer medical treatments for hair loss. A scalp massage with a natural oil to stimulate blood flow can be a great home practice, but I recommend consulting a specialist for proven regrowth options like minoxidil.";
    }
    if (hasWords('burn|sunburn|peeling')) {
        return "For burns or severe sunburns, we recommend focusing entirely on healing rather than cosmetics. Pure aloe vera gel and cold compresses are your best tools right now. Please avoid any of our active serums or scrubs until your skin has completely recovered.";
    }

    // Generic help/recommend triggers
    if (hasExact('recommend|suggest|routine|best|help')) {
        return "Tell me your primary concern, hydration, brightening, anti-aging, or acne, and I'll craft a personalized routine for you.";
    }
    if (hasExact('thank you|thanks|great|amazing|awesome|perfect|good')) {
        return "My pleasure! Is there anything else I can help you with, perhaps a haircare routine, fragrance, or skincare ritual?";
    }
    if (hasExact('tip|advice|general')) {
        const generalTips = [
            "Here's a tip: Always apply your skincare products from thinnest to thickest consistency, ending with a moisturizer or oil.",
            "For a quick glow, try giving yourself a gentle facial massage while applying your morning serum to stimulate circulation.",
            "Remember that consistency is more important than complexity! A simple routine done every single day yields the best results.",
            "Make sure you're drinking plenty of water and getting enough sleep. The best skincare in the world can't outwork exhaustion!"
        ];
        return generalTips[Math.floor(Math.random() * generalTips.length)];
    }

    // Greetings last
    if (hasExact('hello|hi|hey|greetings|morning|afternoon')) {
        return "Hello! I'm Eloria, your luxury beauty advisor. Tell me about your skin or hair concerns and I'll recommend perfect products.";
    }
    if (hasExact('listen|can you|are you|hear')) {
        return "Yes, I can hear you perfectly! Tell me about your skin or hair concern and I'll recommend the perfect products from our collection.";
    }
    
    // General fallback for unrecognized concerns that still sound like beauty/skin
    if (text.includes('skin') || text.includes('hair') || text.includes('face') || text.includes('body')) {
        return "I'm sorry, I don't have a specific Eloria Luxe product to address that precise concern right now. However, maintaining a consistent routine of gentle cleansing, daily hydration, and sun protection is always the best foundation for healthy beauty.";
    }

    if (text.includes('tip') || text.includes('advice') || text.includes('help') || text.includes('general')) {
        const generalTips = [
            "Here's a tip: Always apply your skincare products from thinnest to thickest consistency, ending with a moisturizer or oil.",
            "For a quick glow, try giving yourself a gentle facial massage while applying your morning serum to stimulate circulation.",
            "Remember that consistency is more important than complexity! A simple routine done every single day yields the best results.",
            "Make sure you're drinking plenty of water and getting enough sleep. The best skincare in the world can't outwork exhaustion!"
        ];
        return generalTips[Math.floor(Math.random() * generalTips.length)];
    }

    return "Could you tell me more about your main skin concern? Whether it's hydration, brightness, firming, acne, or hair care, I'll find perfect products for you. Or, if it's something else, I can offer general tips.";
};

const AIAdvisorCall = ({ onEndCall }) => {
    const [callState, setCallState] = useState('connecting');
    const [duration, setDuration] = useState(0);
    const [transcript, setTranscript] = useState('');
    const [aiMessage, setAiMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    const mountedRef = useRef(true);
    // wantListening: true means keep the mic alive (auto-restart on no-speech)
    const wantListeningRef = useRef(false);
    const recognitionRef = useRef(null);
    const finalTextRef = useRef('');
    const processTimerRef = useRef(null);
    const respondingRef = useRef(false);
    const utteranceRef = useRef(null);

    function speakText(text, onDone) {
        console.log('[ELORIA] Speaking:', text.substring(0, 50));
        if (!window.speechSynthesis) { if (onDone) onDone(); return; }
        
        // This cancel() is necessary but can cause a known Chrome bug if speak() is called instantly after.
        window.speechSynthesis.cancel();
        
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            utteranceRef.current = utterance; // Memory lock

            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v =>
                v.name === 'Google UK English Female' ||
                v.name === 'Samantha' ||
                v.name === 'Victoria' ||
                v.name.toLowerCase().includes('female')
            ) || voices[0];
            
            if (preferred) utterance.voice = preferred;
            utterance.pitch = 1.04;
            utterance.rate = 1.05;
            
            const durationEstimate = (text.split(' ').length * 300) + 2000;
            let isDone = false;

            utterance.onend = () => {
                if (isDone) return;
                isDone = true;
                console.log('[ELORIA] Speech done');
                if (onDone) onDone();
            };

            utterance.onerror = (e) => {
                if (isDone) return;
                isDone = true;
                console.log('[ELORIA] Speech error:', e);
                if (onDone) onDone();
            };

            window.speechSynthesis.speak(utterance);

            // Safety fallback timer if the browser drops the onend event
            setTimeout(() => {
                if (!isDone) {
                    console.log('[ELORIA] Speech fallback timeout triggered');
                    isDone = true;
                    if (onDone) onDone();
                }
            }, durationEstimate);
        }, 50); // 50ms delay perfectly avoids the Chrome cancel-swallow bug!
    }

    function respondToSpeech(text) {
        // Guard against double calls
        if (respondingRef.current) {
            console.log('[ELORIA] Already responding, ignoring duplicate call');
            return;
        }
        respondingRef.current = true;
        console.log('[ELORIA] RESPONDING to:', text);

        // Clear refs BEFORE aborting recognition to prevent onend re-triggering
        finalTextRef.current = '';
        wantListeningRef.current = false;
        if (processTimerRef.current) {
            clearTimeout(processTimerRef.current);
            processTimerRef.current = null;
        }
        if (recognitionRef.current) {
            try { recognitionRef.current.abort(); } catch(e) {}
            recognitionRef.current = null;
        }

        const response = getAIResponse(text);
        console.log('[ELORIA] Response:', response.substring(0, 60));

        setTranscript('');
        setIsRecording(false);
        setAiMessage(response);
        setCallState('speaking');

        speakText(response, () => {
            if (!mountedRef.current) return;
            console.log('[ELORIA] Done speaking, auto-restarting mic for next question...');
            respondingRef.current = false;
            setAiMessage('');
            finalTextRef.current = '';
            wantListeningRef.current = true;
            bootRecognition();
        });
    }

    // Create and start a fresh SpeechRecognition instance
    function bootRecognition() {
        if (!mountedRef.current || !wantListeningRef.current) return;

        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return;

        console.log('[ELORIA] Booting new recognition instance...');

        const recognition = new SR();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognitionRef.current = recognition;

        recognition.onstart = () => {
            console.log('[ELORIA] Mic is LIVE');
            if (mountedRef.current) {
                setIsRecording(true);
                setCallState('listening');
            }
        };

        recognition.onresult = (event) => {
            if (!mountedRef.current) return;
            let fullText = '';
            for (let i = 0; i < event.results.length; i++) {
                fullText += event.results[i][0].transcript;
            }
            
            console.log('[ELORIA] Heard:', fullText);
            setTranscript(fullText);

            if (fullText.trim()) {
                finalTextRef.current = fullText.trim();
                // Wait a short moment of silence, then auto-respond
                if (processTimerRef.current) clearTimeout(processTimerRef.current);
                processTimerRef.current = setTimeout(() => {
                    if (finalTextRef.current && mountedRef.current) {
                        console.log('[ELORIA] Silence detected, processing!');
                        respondToSpeech(finalTextRef.current);
                    }
                }, 800);
            }
        };

        recognition.onerror = (e) => {
            console.log('[ELORIA] Error:', e.error, '- wantListening:', wantListeningRef.current);
            // On no-speech: do NOT change UI. Just let onend restart.
            // On aborted: ignore (we caused it intentionally)
            if (e.error !== 'no-speech' && e.error !== 'aborted') {
                wantListeningRef.current = false;
                if (mountedRef.current) {
                    setIsRecording(false);
                    setCallState('idle');
                }
            }
        };

        recognition.onend = () => {
            console.log('[ELORIA] Recognition ended. wantListening:', wantListeningRef.current);
            recognitionRef.current = null;

            // If we still want to listen (user hasn't stopped), restart!
            if (wantListeningRef.current && mountedRef.current) {
                console.log('[ELORIA] Auto-restarting recognition...');
                setTimeout(() => bootRecognition(), 50);
            } else if (mountedRef.current) {
                setIsRecording(false);
                // If we have final text that wasn't processed, process it now
                if (finalTextRef.current.trim()) {
                    if (processTimerRef.current) clearTimeout(processTimerRef.current);
                    respondToSpeech(finalTextRef.current);
                } else if (!respondingRef.current) {
                    setCallState('idle');
                }
            }
        };

        try {
            recognition.start();
        } catch(e) {
            console.log('[ELORIA] Start failed:', e);
            // Retry after a short delay
            if (wantListeningRef.current) {
                setTimeout(() => bootRecognition(), 500);
            }
        }
    }

    function handleMicClick() {
        console.log('[ELORIA] MIC CLICK. isRecording:', isRecording, 'callState:', callState);
        if (callState === 'speaking') return;

        if (wantListeningRef.current) {
            // STOP
            console.log('[ELORIA] Stopping...');
            wantListeningRef.current = false;
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch(e) {}
            }
        } else {
            // START
            console.log('[ELORIA] Starting...');
            window.speechSynthesis?.cancel();
            setAiMessage('');
            setTranscript('');
            finalTextRef.current = '';
            wantListeningRef.current = true;
            bootRecognition();
        }
    }

    useEffect(() => {
        mountedRef.current = true;
        const timer = setInterval(() => setDuration(d => d + 1), 1000);
        if (window.speechSynthesis) window.speechSynthesis.getVoices();

        const greeting = "Welcome to Eloria Luxe. I'm Eloria. Tap the microphone and tell me your skin concern.";
        const init = setTimeout(() => {
            if (!mountedRef.current) return;
            setCallState('speaking');
            setAiMessage(greeting);
            speakText(greeting, () => {
                if (!mountedRef.current) return;
                setAiMessage('');
                setCallState('idle');
            });
        }, 1200);

        return () => {
            mountedRef.current = false;
            wantListeningRef.current = false;
            clearInterval(timer);
            clearTimeout(init);
            if (processTimerRef.current) clearTimeout(processTimerRef.current);
            window.speechSynthesis?.cancel();
            if (recognitionRef.current) {
                try { recognitionRef.current.abort(); } catch(e) {}
            }
        };
    }, []);

    const fmt = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const statusLabel = callState === 'connecting' ? 'Connecting...'
        : callState === 'speaking' ? 'Eloria is speaking...'
        : isRecording ? 'Listening... speak now'
        : 'Tap mic to ask';

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ scale: 0.88, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.88, y: 30 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="bg-gradient-to-b from-[#191919] to-[#282828] w-full max-w-[360px] rounded-[3rem] px-8 pt-10 pb-9 flex flex-col items-center relative overflow-hidden shadow-2xl border border-white/10">

                <div className={`absolute inset-0 bg-[#b8955a] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${callState === 'speaking' ? 'opacity-[0.22]' : isRecording ? 'opacity-[0.15]' : 'opacity-[0.07]'}`} />
                <p className="text-[#b8955a] font-bold tracking-[0.25em] uppercase text-[9px] mb-7 z-10">Eloria AI Advisor</p>

                <div className="relative w-32 h-32 mb-7 z-10 flex items-center justify-center">
                    <motion.div animate={{ scale: callState === 'speaking' ? [1,1.6,1] : isRecording ? [1,1.25,1] : 1, opacity: callState === 'speaking' ? [0.25,0.04,0.25] : isRecording ? [0.2,0.06,0.2] : 0.07 }}
                        transition={{ repeat: Infinity, duration: callState === 'speaking' ? 1.5 : 1.8 }} className="absolute inset-0 bg-[#b8955a] rounded-full" />
                    <motion.div animate={{ scale: callState === 'speaking' ? [1,1.25,1] : 1, opacity: callState === 'speaking' ? [0.45,0.1,0.45] : 0.15 }}
                        transition={{ repeat: Infinity, duration: 1.2 }} className="absolute inset-4 bg-[#b8955a] rounded-full" />
                    <div className="absolute inset-8 bg-gradient-to-br from-[#c9a46a] to-[#8a6e40] rounded-full flex items-center justify-center shadow-xl shadow-[#b8955a]/50">
                        <Sparkles className="text-white w-6 h-6" />
                    </div>
                </div>

                <div className="text-center z-10 w-full min-h-[160px] flex flex-col justify-center gap-3 mb-7">
                    <div>
                        <h2 className="text-white text-lg font-serif">{statusLabel}</h2>
                        <p className="text-[#b8955a] font-mono text-xs mt-1">{fmt(duration)}</p>
                    </div>
                    <AnimatePresence mode="wait">
                        {aiMessage && (
                            <motion.div key="ai" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }}
                                className="bg-[#b8955a]/10 border border-[#b8955a]/20 rounded-2xl px-4 py-3 text-left">
                                <p className="text-[9px] text-[#b8955a] uppercase tracking-widest mb-1.5 font-bold">Eloria</p>
                                <p className="text-gray-300 text-xs italic leading-relaxed">"{aiMessage.length > 150 ? aiMessage.slice(0,150)+'...' : aiMessage}"</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {transcript && !aiMessage && (
                            <motion.div key="you" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-left">
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1.5 font-bold">You</p>
                                <p className="text-white text-xs leading-relaxed">{transcript}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-5 z-10">
                    <button onClick={handleMicClick}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all border ${isRecording ? 'bg-green-500/30 border-green-400/50 text-green-300 shadow-lg shadow-green-500/20' : callState === 'speaking' ? 'bg-white/5 border-white/10 text-gray-600' : 'bg-[#b8955a]/20 border-[#b8955a]/40 text-[#b8955a] hover:bg-[#b8955a]/30 hover:scale-105'}`}>
                        {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
                    </button>
                    <button onClick={onEndCall} className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all hover:scale-105">
                        <PhoneOff size={23} />
                    </button>
                    <button onClick={() => { window.speechSynthesis?.cancel(); setAiMessage(''); setCallState('idle'); }}
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                        <Volume2 size={19} />
                    </button>
                </div>

                <p className="text-gray-500 text-[9px] mt-5 z-10 text-center tracking-wide">
                    {isRecording ? 'Speak now... Eloria responds after you pause' : 'Tap mic, then speak your concern'}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default AIAdvisorCall;
