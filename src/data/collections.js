// ═══════════════════════════════════════════════
//  CURATED COLLECTIONS DATA
//  Each collection is a themed editorial grouping
//  of existing products from the shop.
// ═══════════════════════════════════════════════

export const collections = [
    {
        id: "morning-ritual",
        name: "The Morning Ritual",
        tagline: "Awaken Your Glow",
        description: "Start each day with intention. Our Morning Ritual collection brings together the essentials for a luminous, dewy complexion — from vitamin-infused serums to pore-perfecting primers. A curated AM routine that transforms your mornings into moments of self-care.",
        shortDescription: "Curated AM essentials for a luminous start to your day.",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200",
        color: "from-amber-100/80 via-orange-50/60 to-yellow-50/40",
        accentColor: "#d4a373",
        productIds: [1, 9, 11, 14],  // Rose Serum, Glow Drops, Primer, Vitamin C
        season: "All Year",
        featured: true,
    },
    {
        id: "golden-hour-glam",
        name: "Golden Hour Glam",
        tagline: "Radiance After Dark",
        description: "When the lights dim and the evening unfolds, let your beauty command the room. The Golden Hour Glam collection pairs bold, pigment-rich lipsticks with our iconic gold palette and champagne highlighter — everything you need for a show-stopping night.",
        shortDescription: "Bold, glamorous essentials for an unforgettable evening look.",
        image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&q=80&w=1200",
        color: "from-yellow-100/80 via-amber-50/60 to-orange-50/40",
        accentColor: "#d4af37",
        productIds: [6, 4, 16, 10],  // Rouge, Gold Palette, Highlighter, Lip Gloss
        season: "All Year",
        featured: true,
    },
    {
        id: "midnight-recovery",
        name: "Midnight Recovery",
        tagline: "Restore While You Rest",
        description: "Let the night do the work. Our Midnight Recovery collection harnesses powerful botanicals and gold-infused treatments that work in harmony with your skin's natural overnight repair cycle. Wake up to visibly restored, radiant skin.",
        shortDescription: "Powerful overnight treatments for skin that repairs while you sleep.",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=1200",
        color: "from-indigo-100/80 via-purple-50/60 to-slate-50/40",
        accentColor: "#7c6ea0",
        productIds: [8, 12, 1, 5],  // Recovery Oil, Gold Mask, Rose Serum, Scrub
        season: "All Year",
        featured: false,
    },
    {
        id: "the-bridal-edit",
        name: "The Bridal Edit",
        tagline: "Your Most Beautiful Day",
        description: "Crafted for the bride who wants timeless elegance. This curated set features silky foundations, soft blush tones, luminous setting powders, and a luscious lip gloss — creating a flawless, camera-ready look that lasts from ceremony to celebration.",
        shortDescription: "Timeless bridal beauty for a flawless, camera-ready celebration.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200",
        color: "from-rose-100/80 via-pink-50/60 to-white/40",
        accentColor: "#eec0c8",
        productIds: [2, 15, 13, 10],  // Foundation, Blush Duo, Setting Powder, Lip Gloss
        season: "All Year",
        featured: true,
    },
    {
        id: "radiance-boosters",
        name: "Radiance Boosters",
        tagline: "Illuminate From Within",
        description: "Dull skin, meet your match. The Radiance Boosters collection targets uneven tone, dark spots, and lackluster complexions with a potent lineup of diamond-dust exfoliants, vitamin C powerhouses, and ethereal highlighters that leave skin positively glowing.",
        shortDescription: "Target dullness with exfoliants, serums, and highlighters.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200",
        color: "from-yellow-100/80 via-lime-50/60 to-emerald-50/40",
        accentColor: "#c9a84c",
        productIds: [5, 14, 16, 9],  // Quartz Scrub, Vitamin C, Highlighter, Glow Drops
        season: "Spring 2026",
        featured: false,
    },
    {
        id: "the-minimalist",
        name: "The Minimalist",
        tagline: "Less Is Luxe",
        description: "For those who believe beauty is found in simplicity. The Minimalist collection distills your entire routine down to just four essential products — a serum, a foundation, a blush, and a setting powder. Everything you need, nothing you don't.",
        shortDescription: "A capsule beauty routine — just four essentials, nothing more.",
        image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?auto=format&fit=crop&q=80&w=1200",
        color: "from-stone-100/80 via-neutral-50/60 to-gray-50/40",
        accentColor: "#8a8178",
        productIds: [1, 2, 18, 13],  // Rose Serum, Foundation, Cream Blush, Setting Powder
        season: "All Year",
        featured: false,
    },
];

export default collections;
