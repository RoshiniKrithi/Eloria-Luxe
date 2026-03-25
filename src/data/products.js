export const shopProducts = [
    // ═══════════════════════════════════════════════
    //  SKINCARE PRODUCTS
    // ═══════════════════════════════════════════════
    {
        id: 1,
        name: "Éclat de Rose Serum",
        category: "Skincare",
        brand: "Eloria Luxe",
        price: 1.00,
        rating: 5,
        reviews: 342,
        isNew: true,
        image: "/images/products/skincare.png",
        description: "Infused with rare damask rose extracts for a youthful, luminous glow.",
        longDescription: "Our signature Éclat de Rose Serum combines the finest damask rose absolute with a potent complex of hyaluronic acid and niacinamide. This award-winning formula penetrates deep into the skin's dermal layers, promoting cellular renewal while delivering an instant luminosity that lasts throughout the day. Crafted in our Swiss laboratory using cold-press extraction to preserve the rose's most delicate bioactive compounds.",
        features: [
            { label: "Key Ingredient", value: "Damask Rose Extract" },
            { label: "Skin Type", value: "All Skin Types" },
            { label: "Volume", value: "30ml" },
            { label: "Texture", value: "Lightweight Serum" },
            { label: "Benefits", value: "Anti-Aging, Brightening, Hydrating" },
            { label: "Usage", value: "Morning & Evening" }
        ],
        ingredients: "Rosa Damascena Flower Water, Hyaluronic Acid, Niacinamide, Rosehip Seed Oil, Vitamin E, Squalane, Jojoba Oil",
        howToUse: "Apply 3-4 drops to cleansed face and neck. Gently press into skin using upward motions. Follow with moisturizer. Use morning and evening for best results."
    },
    {
        id: 5,
        name: "Diamond Quartz Scrub",
        category: "Skincare",
        brand: "Eloria Luxe",
        price: 65.00,
        rating: 4,
        reviews: 128,
        isNew: false,
        image: "/images/products/diamond-quartz-scrub.png",
        description: "Exfoliating minerals and quartz dust for diamond-smooth skin.",
        longDescription: "Harness the power of micro-fine diamond particles and natural quartz crystals in this luxurious exfoliating treatment. The dual-action formula gently buffs away dead skin cells while simultaneously infusing the skin with brightening minerals. Each grain is precision-milled to ensure effective exfoliation without micro-tears, leaving skin impossibly smooth and luminous.",
        features: [
            { label: "Key Ingredient", value: "Diamond Powder & Quartz" },
            { label: "Skin Type", value: "Normal to Oily" },
            { label: "Volume", value: "100ml" },
            { label: "Texture", value: "Fine Granular Paste" },
            { label: "Benefits", value: "Exfoliating, Brightening, Smoothing" },
            { label: "Usage", value: "2-3 Times Weekly" }
        ],
        ingredients: "Diamond Powder, Quartz Microcrystals, Kaolin Clay, Coconut Oil, Aloe Vera, Glycerin, Vitamin C",
        howToUse: "Apply to damp skin in gentle circular motions. Avoid eye area. Rinse thoroughly with warm water. Use 2-3 times per week for optimal results."
    },
    {
        id: 8,
        name: "Midnight Recovery Oil",
        category: "Skincare",
        brand: "Eloria Luxe",
        price: 95.00,
        rating: 5,
        reviews: 423,
        isNew: false,
        image: "/images/products/midnight-recovery-oil.png",
        description: "Botanical night oil that visibly restores skin overnight.",
        longDescription: "This overnight recovery powerhouse blends 12 rare botanical oils — including evening primrose, lavender, and squalane — to deeply repair and replenish skin while you sleep. Its advanced chrono-biology formula syncs with your skin's natural nighttime renewal cycle, accelerating cell turnover and collagen synthesis. Wake up to visibly plumper, smoother, and more radiant skin every morning.",
        features: [
            { label: "Key Ingredient", value: "Evening Primrose & Lavender" },
            { label: "Skin Type", value: "Dry to Combination" },
            { label: "Volume", value: "30ml" },
            { label: "Texture", value: "Luxurious Face Oil" },
            { label: "Benefits", value: "Repairing, Nourishing, Anti-Aging" },
            { label: "Usage", value: "Every Evening" }
        ],
        ingredients: "Evening Primrose Oil, Lavender Essential Oil, Squalane, Rosehip Seed Oil, Argan Oil, Vitamin E, Chamomile Extract",
        howToUse: "Apply 4-5 drops onto palms and press gently into cleansed face and neck before bed. Allow to absorb for 5 minutes before resting on pillow."
    },
    {
        id: 9,
        name: "Hyaluronic Glow Drops",
        category: "Skincare",
        brand: "Eloria Luxe",
        price: 88.00,
        rating: 5,
        reviews: 276,
        isNew: true,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        description: "Triple-weight hyaluronic acid complex for deep hydration and plump, dewy skin.",
        longDescription: "Featuring a breakthrough triple-weight hyaluronic acid complex, these concentrated glow drops deliver hydration at three distinct skin depths. Low-molecular HA penetrates deep for lasting plumpness, mid-weight HA fills fine lines, and high-molecular HA creates a moisture-locking shield on the surface. The result: visibly bouncy, glass-like skin from the very first application.",
        features: [
            { label: "Key Ingredient", value: "Triple-Weight Hyaluronic Acid" },
            { label: "Skin Type", value: "All Skin Types" },
            { label: "Volume", value: "30ml" },
            { label: "Texture", value: "Water-Gel Drops" },
            { label: "Benefits", value: "Deep Hydration, Plumping, Glass Skin" },
            { label: "Usage", value: "Morning & Evening" }
        ],
        ingredients: "Low-Molecular Hyaluronic Acid, Mid-Molecular Hyaluronic Acid, High-Molecular Hyaluronic Acid, Glycerin, Aloe Vera, Panthenol",
        howToUse: "Apply 2-3 drops to damp skin after cleansing. Pat gently to aid absorption. Layer under serum or moisturizer. Works best on slightly damp skin."
    },

    // ═══════════════════════════════════════════════
    //  MAKEUP PRODUCTS
    // ═══════════════════════════════════════════════
    {
        id: 6,
        name: "Velvet Matte Rouge",
        category: "Makeup",
        brand: "Eloria Luxe",
        price: 42.00,
        rating: 5,
        reviews: 567,
        isNew: true,
        image: "/images/products/makeup.png",
        description: "Intense pigment with a cream-to-powder finish that lasts all day.",
        longDescription: "Experience the ultimate luxury lip colour with our Velvet Matte Rouge. This revolutionary cream-to-powder formula glides on like silk and sets to a weightless, transfer-proof matte finish. Enriched with jojoba oil and vitamin E, it keeps lips nourished and comfortable without cracking or feathering. One swipe delivers full, opaque colour that lasts up to 12 hours.",
        features: [
            { label: "Key Ingredient", value: "Jojoba Oil & Vitamin E" },
            { label: "Finish", value: "Velvet Matte" },
            { label: "Weight", value: "3.5g" },
            { label: "Texture", value: "Cream-to-Powder" },
            { label: "Benefits", value: "Transfer-Proof, Long-Lasting, Hydrating" },
            { label: "Usage", value: "Apply Directly or with Lip Brush" }
        ],
        ingredients: "Jojoba Oil, Vitamin E, Beeswax, Shea Butter, Iron Oxides, Carnauba Wax, Candelilla Wax",
        howToUse: "Apply directly from the bullet or use a lip brush for precision. Start from the center of lips and blend outward. Blot and reapply for a deeper shade."
    },
    {
        id: 2,
        name: "Satin Silk Foundation",
        category: "Makeup",
        brand: "Eloria Luxe",
        price: 85.00,
        rating: 4,
        reviews: 156,
        isNew: false,
        image: "/images/products/satin-silk-foundation.png",
        description: "Weightless, medium-coverage foundation with a radiant silk-like finish.",
        longDescription: "Our Satin Silk Foundation is a second-skin formula that delivers flawless, buildable coverage with a natural, luminous finish. Infused with light-diffusing micro-pearls and silk amino acids, it blurs imperfections while allowing your natural skin texture to shine through. The breathable, long-wear formula adapts to your skin throughout the day for a fresh, dewy complexion that never looks cakey.",
        features: [
            { label: "Key Ingredient", value: "Silk Amino Acids" },
            { label: "Coverage", value: "Medium, Buildable" },
            { label: "Volume", value: "30ml" },
            { label: "Finish", value: "Satin-Luminous" },
            { label: "Benefits", value: "Blurring, Hydrating, Natural Finish" },
            { label: "Usage", value: "Apply with Brush, Sponge, or Fingers" }
        ],
        ingredients: "Silk Amino Acids, Micro-Pearl Pigments, Hyaluronic Acid, Vitamin E, SPF 15, Squalane, Dimethicone",
        howToUse: "Shake well. Apply a small amount to the center of your face and blend outward using a damp beauty sponge, brush, or fingertips. Build coverage as desired."
    },
    {
        id: 4,
        name: "Celestial Gold Palette",
        category: "Makeup",
        brand: "Eloria Luxe",
        price: 78.00,
        rating: 5,
        reviews: 215,
        isNew: false,
        image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&q=80&w=800",
        description: "Curated hues of champagne, bronze, and gold for ultimate artistry.",
        longDescription: "A masterfully curated collection of 12 celestial shades ranging from soft champagne to deep molten gold. Each shadow features our proprietary MicroSilk technology for buttery-smooth application, zero fallout, and extraordinary colour payoff. The versatile palette transitions effortlessly from a subtle daytime glow to dramatic evening glamour. Housed in a mirror-finished magnetic compact.",
        features: [
            { label: "Shades", value: "12 Curated Colours" },
            { label: "Finish", value: "Matte, Shimmer & Metallic" },
            { label: "Weight", value: "14.4g" },
            { label: "Texture", value: "Buttery-Smooth Powder" },
            { label: "Benefits", value: "High Pigment, Zero Fallout, Blendable" },
            { label: "Usage", value: "Eyes, Face Highlight, Brows" }
        ],
        ingredients: "Talc, Mica, Dimethicone, Zinc Stearate, Gold Pigments, Iron Oxides, Silica, Vitamin E",
        howToUse: "Use the lighter shades as a base, mid-tones in the crease, and deeper shades for definition. Apply shimmer shades with a damp brush for maximum metallic impact."
    },
    {
        id: 10,
        name: "Luxe Lip Gloss Set",
        category: "Makeup",
        brand: "Eloria Luxe",
        price: 52.00,
        rating: 4,
        reviews: 389,
        isNew: true,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
        description: "High-shine, non-sticky formula infused with vitamin E and rose hip oil.",
        longDescription: "This trio of high-shine lip glosses delivers mirror-like brilliance without any stickiness. Each shade is infused with nourishing vitamin E, rosehip oil, and hyaluronic acid filling spheres that plump lips on contact. The doe-foot applicator ensures precise, even application. Whether worn alone for a natural sheen or layered over lipstick for extra dimension, these glosses are an everyday luxury.",
        features: [
            { label: "Key Ingredient", value: "Rosehip Oil & Vitamin E" },
            { label: "Set Includes", value: "3 Glosses" },
            { label: "Volume", value: "3 × 4ml" },
            { label: "Finish", value: "High-Shine, Non-Sticky" },
            { label: "Benefits", value: "Plumping, Nourishing, Glossy" },
            { label: "Usage", value: "Alone or Over Lipstick" }
        ],
        ingredients: "Rosehip Seed Oil, Vitamin E, Hyaluronic Acid Spheres, Polybutene, Jojoba Oil, Shea Butter Extract",
        howToUse: "Apply from the center of the lower lip and spread outward. Layer over lipstick for added dimension or wear alone for a natural shine."
    },

    // ═══════════════════════════════════════════════
    //  FACE PRODUCTS
    // ═══════════════════════════════════════════════
    {
        id: 11,
        name: "Porcelain Perfecting Primer",
        category: "Face",
        brand: "Eloria Luxe",
        price: 58.00,
        rating: 5,
        reviews: 198,
        isNew: true,
        image: "/images/products/face.png",
        description: "Silky primer that blurs pores and creates a flawless canvas for makeup.",
        longDescription: "This revolutionary silicone-free primer creates an imperceptibly smooth canvas that extends makeup wear by up to 16 hours. The innovative Porcelain Complex — a blend of blurring microspheres and light-scattering particles — instantly minimizes pores, fine lines, and uneven texture. Its weightless, breathable formula works with all skin types and never pills under foundation.",
        features: [
            { label: "Key Ingredient", value: "Porcelain Complex" },
            { label: "Skin Type", value: "All Skin Types" },
            { label: "Volume", value: "30ml" },
            { label: "Finish", value: "Matte-Smooth" },
            { label: "Benefits", value: "Pore-Blurring, Long-Wear, Smoothing" },
            { label: "Usage", value: "Before Foundation" }
        ],
        ingredients: "Silica Microspheres, Niacinamide, Glycerin, Dimethicone, Squalane, Green Tea Extract, Vitamin B5",
        howToUse: "After moisturizer, apply a pea-sized amount to the T-zone and areas with visible pores. Blend outward with fingertips. Wait 60 seconds before applying foundation."
    },
    {
        id: 12,
        name: "24K Gold Face Mask",
        category: "Face",
        brand: "Eloria Luxe",
        price: 135.00,
        rating: 5,
        reviews: 312,
        isNew: false,
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800",
        description: "Luxurious gold-infused mask that firms, brightens, and rejuvenates tired skin.",
        longDescription: "Indulge in the ultimate luxury skincare ritual with our 24K Gold Face Mask. Real 24-karat gold leaf, suspended in a rich collagen gel, works synergistically with peptides and royal jelly to firm sagging skin, reduce the appearance of wrinkles, and impart a radiant golden glow. This transformative treatment delivers spa-grade results in just 20 minutes.",
        features: [
            { label: "Key Ingredient", value: "24K Gold Leaf & Collagen" },
            { label: "Skin Type", value: "All Skin Types, Anti-Aging" },
            { label: "Volume", value: "50ml (5 Treatments)" },
            { label: "Texture", value: "Rich Gold Gel" },
            { label: "Benefits", value: "Firming, Brightening, Anti-Wrinkle" },
            { label: "Usage", value: "Weekly Treatment" }
        ],
        ingredients: "24K Gold Leaf, Hydrolyzed Collagen, Royal Jelly, Retinol, Peptide Complex, Aloe Vera, Vitamin C",
        howToUse: "Apply a generous layer to clean, dry skin. Relax for 15-20 minutes. Rinse with lukewarm water and follow with serum and moisturizer. Use once weekly."
    },
    {
        id: 13,
        name: "Radiance Setting Powder",
        category: "Face",
        brand: "Eloria Luxe",
        price: 48.00,
        rating: 4,
        reviews: 241,
        isNew: false,
        image: "/images/products/radiance-setting-powder.png",
        description: "Ultra-fine translucent powder that sets makeup with a luminous, airbrushed finish.",
        longDescription: "Set your look to perfection with this ultra-fine, micro-milled translucent powder. The Radiance Setting Powder uses light-reflecting technology to set makeup without adding weight or dullness. Its innovative formula absorbs excess oil while maintaining your skin's natural luminosity, giving you that coveted 'filtered' look in real life. Universally flattering and suitable for all skin tones.",
        features: [
            { label: "Key Ingredient", value: "Light-Reflecting Minerals" },
            { label: "Finish", value: "Luminous-Matte" },
            { label: "Weight", value: "10g" },
            { label: "Texture", value: "Micro-Milled Powder" },
            { label: "Benefits", value: "Oil Control, Setting, Blurring" },
            { label: "Usage", value: "Over Foundation or Alone" }
        ],
        ingredients: "Silica, Mica, Light-Reflecting Minerals, Kaolin, Zinc Oxide, Vitamin E, Rice Powder",
        howToUse: "Using a fluffy brush, lightly dust over foundation, concentrating on the T-zone. For baking, apply generously under the eyes and let sit 5 minutes before brushing away excess."
    },
    {
        id: 14,
        name: "Vitamin C Bright Serum",
        category: "Face",
        brand: "Eloria Luxe",
        price: 72.00,
        rating: 5,
        reviews: 458,
        isNew: true,
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=800",
        description: "Potent vitamin C formula that targets dark spots and uneven skin tone.",
        longDescription: "This clinical-grade, stabilized Vitamin C serum delivers a potent 15% L-Ascorbic Acid concentration directly into the skin. Enhanced with ferulic acid and vitamin E for maximum antioxidant protection, this powerhouse formula visibly reduces dark spots, evens out skin tone, and shields against environmental aggressors. Clinical trials show 73% improvement in skin brightness after just 4 weeks of daily use.",
        features: [
            { label: "Key Ingredient", value: "15% L-Ascorbic Acid" },
            { label: "Skin Type", value: "All Skin Types" },
            { label: "Volume", value: "30ml" },
            { label: "Texture", value: "Lightweight Serum" },
            { label: "Benefits", value: "Brightening, Dark Spot Correction, Antioxidant" },
            { label: "Usage", value: "Every Morning" }
        ],
        ingredients: "15% L-Ascorbic Acid, Ferulic Acid, Vitamin E, Hyaluronic Acid, Niacinamide, Green Tea Extract",
        howToUse: "Apply 4-5 drops to clean, dry skin every morning before moisturizer and sunscreen. Avoid mixing with retinol. Store in a cool, dark place."
    },

    // ═══════════════════════════════════════════════
    //  CHEEKS PRODUCTS
    // ═══════════════════════════════════════════════
    {
        id: 15,
        name: "Rose Petal Blush Duo",
        category: "Cheeks",
        brand: "Eloria Luxe",
        price: 46.00,
        rating: 5,
        reviews: 287,
        isNew: true,
        image: "/images/products/cheeks.png",
        description: "Silky blush duo in soft rose and warm peach tones for a natural flush.",
        longDescription: "This exquisite blush duo pairs a soft petal rose with a warm sun-kissed peach in one harmonious compact. Each shade is infused with real rose petal extract and micro-fine pearls for a naturally flushed, healthy glow. The silky, buildable formula blends effortlessly and lasts all day. The mirrored compact features our signature gold-embossed petal design.",
        features: [
            { label: "Key Ingredient", value: "Rose Petal Extract" },
            { label: "Shades", value: "2 Complementary Hues" },
            { label: "Weight", value: "8g" },
            { label: "Finish", value: "Satin-Natural" },
            { label: "Benefits", value: "Buildable, Long-Lasting, Luminous" },
            { label: "Usage", value: "Cheeks, Eyes, Lips" }
        ],
        ingredients: "Rosa Centifolia Petal Extract, Mica, Talc, Micro-Pearl Pigments, Vitamin E, Jojoba Oil, Silica",
        howToUse: "Smile and apply the rose shade to the apples of cheeks, blending upward toward temples. Use the peach shade as a topper for added warmth and dimension."
    },
    {
        id: 16,
        name: "Champagne Highlighter",
        category: "Cheeks",
        brand: "Eloria Luxe",
        price: 54.00,
        rating: 5,
        reviews: 412,
        isNew: false,
        image: "/images/products/champagne-highlighter.png",
        description: "Buttery-soft champagne highlighter for an ethereal, lit-from-within glow.",
        longDescription: "Achieve an otherworldly, lit-from-within radiance with our best-selling Champagne Highlighter. This buttery-soft baked formula features a sophisticated champagne-gold hue with micro-fine light-catching particles that create a multidimensional glow. Never glittery or chunky — just pure, seamless luminosity. The unique baked formulation means incredible colour payoff with a single swipe.",
        features: [
            { label: "Key Ingredient", value: "Champagne Pearl Complex" },
            { label: "Shade", value: "Champagne Gold" },
            { label: "Weight", value: "7g" },
            { label: "Finish", value: "Multidimensional Glow" },
            { label: "Benefits", value: "Light-Catching, Non-Glittery, Buildable" },
            { label: "Usage", value: "Cheekbones, Brow Bone, Cupid's Bow" }
        ],
        ingredients: "Baked Mica, Champagne Pearl Pigments, Dimethicone, Silica, Vitamin E, Coconut Oil, Gold Pigments",
        howToUse: "Apply to the high points of the face — cheekbones, brow bone, bridge of nose, and cupid's bow — using a fan brush or fingertips. Build for more intensity."
    },
    {
        id: 17,
        name: "Sunset Bronzer Palette",
        category: "Cheeks",
        brand: "Eloria Luxe",
        price: 62.00,
        rating: 4,
        reviews: 176,
        isNew: true,
        image: "/images/products/sunset-bronzer-palette.png",
        description: "Four luxuriously blendable sun-kissed shades — from champagne bronze to deep amber — designed to sculpt, contour, and bathe your complexion in a warm, golden-hour glow.",
        longDescription: "Capture the warmth of golden hour with this quad-palette of expertly curated bronzing shades. From a luminous champagne bronze to a rich deep amber, each shade is silky-smooth and infinitely blendable. The versatile palette works across all skin tones for sculpting, contouring, and warming the complexion. Housed in a sleek gold-accented compact with a full-size mirror.",
        features: [
            { label: "Shades", value: "4 Sun-Kissed Hues" },
            { label: "Finish", value: "Matte & Soft Shimmer" },
            { label: "Weight", value: "12g" },
            { label: "Texture", value: "Silky-Smooth Powder" },
            { label: "Benefits", value: "Sculpting, Contouring, Warming" },
            { label: "Usage", value: "Face & Body Bronzing" }
        ],
        ingredients: "Talc, Mica, Iron Oxides, Dimethicone, Bronze Pearl Pigments, Vitamin E, Coconut Oil, Silica",
        howToUse: "Using an angled brush, apply the contour shade below cheekbones in a sweeping motion. Dust the shimmer shades on high points for a sun-kissed glow. Blend well."
    },
    {
        id: 18,
        name: "Peony Cream Blush",
        category: "Cheeks",
        brand: "Eloria Luxe",
        price: 38.00,
        rating: 5,
        reviews: 334,
        isNew: false,
        image: "https://images.unsplash.com/photo-1625093525885-282384697917?q=80&w=800&auto=format&fit=crop",
        description: "Creamy, buildable blush that melts into skin for a dewy, natural-looking flush.",
        longDescription: "Experience the most natural-looking flush with our Peony Cream Blush. This innovative cream-to-dewy formula melts seamlessly into skin, creating an authentic, I-just-pinched-my-cheeks glow. Infused with peony root extract and hyaluronic acid, it hydrates as it colours. The buildable formula lets you go from a whisper of colour to a vibrant statement with effortless blending.",
        features: [
            { label: "Key Ingredient", value: "Peony Root Extract" },
            { label: "Finish", value: "Cream-to-Dewy" },
            { label: "Weight", value: "5g" },
            { label: "Texture", value: "Ultra-Creamy Balm" },
            { label: "Benefits", value: "Hydrating, Blendable, Natural Flush" },
            { label: "Usage", value: "Cheeks & Lips" }
        ],
        ingredients: "Peony Root Extract, Hyaluronic Acid, Shea Butter, Coconut Oil, Vitamin E, Beeswax, Rose Water",
        howToUse: "Dab a small amount onto fingertips and tap onto the apples of cheeks. Blend outward in circular motions. Can also be applied to lips for a monochromatic look."
    },

    // ═══════════════════════════════════════════════
    //  FRAGRANCE & PERFUME
    // ═══════════════════════════════════════════════
    {
        id: 19,
        name: "Oud Mystique Parfum",
        category: "Perfume",
        brand: "Eloria Luxe",
        price: 245.00,
        rating: 5,
        reviews: 184,
        isNew: true,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
        description: "A dark, seductive blend of rare Agarwood, smoky incense, and velvet rose.",
        longDescription: "Oud Mystique is a profound olfactory journey into the heart of the Orient. Centered around the world's most precious Agarwood (Oud), this extrait de parfum unfolds with layers of burnt frankincense, dark Damask rose, and a base of leather and amber. It is a fragrance of power, mystery, and absolute luxury, designed for those who command presence.",
        features: [
            { label: "Scent Family", value: "Woody Oriental" },
            { label: "Top Notes", value: "Saffron, Cardamom" },
            { label: "Heart Notes", value: "Oud, Damask Rose" },
            { label: "Base Notes", value: "Patchouli, Amber, Leather" },
            { label: "Longevity", value: "12+ Hours (Intense)" },
            { label: "Concentration", value: "Extrait de Parfum" }
        ],
        ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Alpha-Isomethyl Ionone, Linalool, Citronellol, Geraniol, Eugenol, Limonene",
        howToUse: "Mist onto pulse points — neck, wrists, and inner elbows. Do not rub the fragrance into skin, as this breaks down the scent molecules. Allow it to air dry for a lasting trail."
    },
    {
        id: 20,
        name: "Jardin de Soie (Silk Garden)",
        category: "Perfume",
        brand: "Eloria Luxe",
        price: 185.00,
        rating: 5,
        reviews: 212,
        isNew: true,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        description: "An ethereal floral bouquet of white jasmine, peony, and soft silk musks.",
        longDescription: "Inspired by the sun-drenched gardens of the French Riviera, Jardin de Soie is an airy, luminous floral composition. It opens with vibrant notes of bergamot and neroli, leading into a heart of delicate white jasmine and crushed peony petals. The dry-down is a soft, skin-scent of white musk and sandalwood that feels as smooth and intimate as silk draping over bare skin.",
        features: [
            { label: "Scent Family", value: "Floral Musky" },
            { label: "Top Notes", value: "Bergamot, Neroli" },
            { label: "Heart Notes", value: "White Jasmine, Peony" },
            { label: "Base Notes", value: "White Musk, Sandalwood" },
            { label: "Longevity", value: "6-8 Hours" },
            { label: "Concentration", value: "Eau de Parfum" }
        ],
        ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Salicylate, Limonene, Linalool, Citral, Farnesol",
        howToUse: "Spray in a 'cloud' and walk through it for a subtle, full-body distribution. For intimacy, apply directly to the nape of the neck and behind the ears."
    },
    {
        id: 21,
        name: "L'Ambre Royal",
        category: "Perfume",
        brand: "Eloria Luxe",
        price: 210.00,
        rating: 4,
        reviews: 95,
        isNew: false,
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800",
        description: "A warm, regal embrace of golden amber, Madagascan vanilla, and spice.",
        longDescription: "L'Ambre Royal is the embodiment of warmth and sophistication. This opulent fragrance celebrates the golden glow of ancient amber, enriched with the creamy sweetness of hand-harvested Madagascan vanilla and a hint of exotic spice. It is a comforting yet majestic scent that lingers beautifully on a wool coat or a silk scarf during the winter months.",
        features: [
            { label: "Scent Family", value: "Warm Amber" },
            { label: "Top Notes", value: "Cinnamon, Pink Pepper" },
            { label: "Heart Notes", value: "Golden Amber, Labdanum" },
            { label: "Base Notes", value: "Madagascan Vanilla, Benzoin" },
            { label: "Longevity", value: "10+ Hours" },
            { label: "Concentration", value: "Eau de Parfum" }
        ],
        ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Coumarin, Cinnamal, Benzyl Benzoate, Anise Alcohol",
        howToUse: "Focus application on warm areas of the body to project the scent. Apply to the chest and pulse points. Re-apply sparingly for evening use."
    },
    {
        id: 22,
        name: "Nuit d'Étoiles",
        category: "Perfume",
        brand: "Eloria Luxe",
        price: 260.00,
        rating: 5,
        reviews: 156,
        isNew: true,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        description: "A moonlit blend of midnight violet, silver birch, and crystalline musk.",
        longDescription: "Nuit d'Étoiles (Night of Stars) captures the magic of a clear midnight sky. This enchanting fragrance opens with the delicate, powdery scent of night-blooming violets and silver birch wood. As it settles, it reveals a shimmering base of crystalline musk and cold aldehydes that mirror the sparkling brilliance of distant stars. It is a cool, sophisticated scent for the dreamer in all of us.",
        features: [
            { label: "Scent Family", value: "Fresh Woody Floral" },
            { label: "Top Notes", value: "Aldehydes, Bergamot" },
            { label: "Heart Notes", value: "Midnight Violet, Iris" },
            { label: "Base Notes", value: "Silver Birch, White Musk" },
            { label: "Longevity", value: "8-10 Hours" },
            { label: "Concentration", value: "Extrait de Parfum" }
        ],
        ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Alpha-Isomethyl Ionone, Ionone, Musk Ketone, Benzyl Alcohol",
        howToUse: "Apply to the neck and wrists before an evening gala or a quiet walk under the stars. The scent is designed to develop beautifully in cooler evening air."
    },

    // ═══════════════════════════════════════════════
    //  LUXURY HAIRCARE
    // ═══════════════════════════════════════════════
    {
        id: 23,
        name: "Silk Infusion Hair Oil",
        category: "Haircare",
        brand: "Eloria Luxe",
        price: 55.00,
        rating: 5,
        reviews: 428,
        isNew: true,
        image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=800",
        description: "A weightless blend of pure Moroccan Argan oil and liquid silk for mirror-like shine.",
        longDescription: "Transform dull, lifeless strands into a waterfall of liquid gold. Our Silk Infusion Hair Oil uses cold-pressed Moroccan Argan oil and bio-identical silk proteins to penetrate deep into the hair shaft, repairing split ends and eliminating frizz without adding weight. The result is hair that reflects light like a diamond and feels as soft as pure silk.",
        features: [
            { label: "Key Ingredients", value: "Argan Oil, Liquid Silk" },
            { label: "Hair Type", value: "All, especially Dry/Damaged" },
            { label: "Benefits", value: "Glossy Shine, Heat Protection" },
            { label: "Volume", value: "50ml" },
            { label: "Longevity", value: "48-Hour Frizz Control" },
            { label: "Texture", value: "Non-Greasy Serum" }
        ],
        ingredients: "Cyclopentasiloxane, Dimethiconol, Argania Spinosa Kernel Oil, Hydrolyzed Silk, Vitamin E, Fragrance",
        howToUse: "Apply 1-2 pumps to damp hair from mid-lengths to ends before styling. Can also be used on dry hair to tame flyaways and add instant shine."
    },
    {
        id: 24,
        name: "Caviar Reviving Mask",
        category: "Haircare",
        brand: "Eloria Luxe",
        price: 85.00,
        rating: 5,
        reviews: 215,
        isNew: false,
        image: "/images/products/caviar-reviving-mask.png",
        description: "An intensive restorative treatment enriched with black caviar extract and keratin.",
        longDescription: "The ultimate rejuvenation for over-processed or aging hair. Our Caviar Reviving Mask is a rich, buttery treatment that harnesses the amino-acid power of black caviar to rebuild hair structure from within. Keratin and marine botanicals work in harmony to restore elasticity, thickness, and vibrance to every strand. A true spa experience for your hair.",
        features: [
            { label: "Active Agent", value: "Black Caviar Extract" },
            { label: "Treatment Time", value: "10-15 Minutes" },
            { label: "Benefits", value: "Deep Repair, Density, Vitality" },
            { label: "Frequency", value: "Once Weekly" },
            { label: "Volume", value: "200ml" },
            { label: "Free From", value: "Parabens, Sulfates" }
        ],
        ingredients: "Caviar Extract, Hydrolyzed Keratin, Shea Butter, Marine Collagen, Royal Jelly, Panthenol",
        howToUse: "After shampooing, apply a generous amount to towel-dried hair. Massage into lengths and ends. Leave for 10-15 minutes, then rinse thoroughly with cool water."
    },
    {
        id: 25,
        name: "Aurum Gloss Conditioner",
        category: "Haircare",
        brand: "Eloria Luxe",
        price: 45.00,
        rating: 4,
        reviews: 312,
        isNew: true,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800",
        description: "A daily luxury conditioner with 24K gold flakes for smoothing and illuminating.",
        longDescription: "Experience the royal treatment daily with our Aurum Gloss Conditioner. Infused with microscopic 24K gold flakes, this conditioner doesn't just soften—it illuminates. It lays down a microscopic film that reflects light and seals the cuticle, preventing color fade and environmental damage. Enriched with white truffle extract for deep hydration and a scent that lingers all day.",
        features: [
            { label: "Highlight", value: "24K Gold Micro-Flakes" },
            { label: "Scent", value: "White Truffle & Sandalwood" },
            { label: "Benefits", value: "Smoothing, Color Protection" },
            { label: "Safe For", value: "Color-Treated Hair" },
            { label: "Volume", value: "250ml" },
            { label: "Origin", value: "Made in France" }
        ],
        ingredients: "Water, Cetearyl Alcohol, Gold (24K), White Truffle Extract, Camellia Oil, Glycerin, Lactic Acid",
        howToUse: "Apply to clean, wet hair focusing on the ends. Leave for 2-3 minutes to allow the gold particles to bond to the hair surface. Rinse well."
    },
    {
        id: 26,
        name: "Platinum Bond Repair Serum",
        category: "Haircare",
        brand: "Eloria Luxe",
        price: 120.00,
        rating: 5,
        reviews: 189,
        isNew: true,
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800",
        description: "An ultra-concentrated serum designed to rebuild broken hair bonds and restore structural integrity.",
        longDescription: "The crown jewel of hair restoration. Our Platinum Bond Repair Serum uses advanced micro-encapsulation technology to deliver pure plant-based collagen and platinum peptides directly to the hair cortex. It works at a molecular level to repair bonds broken by heat, coloring, and chemical treatments. In just one use, hair is 3x stronger and reflects light with a mirror-like finish.",
        features: [
            { label: "Technology", value: "Bio-Mimetic Bond Building" },
            { label: "Key Agent", value: "Platinum Peptides & Collagen" },
            { label: "Benefits", value: "Structural Repair, Zero Frizz" },
            { label: "Frequency", value: "Daily or Post-Wash" },
            { label: "Volume", value: "30ml" },
            { label: "Origin", value: "Laboratory Developed in Paris" }
        ],
        ingredients: "Platinum Powder, Hydrolyzed Collagen, Silk Amino Acids, Panthenol, Hyaluronic Acid",
        howToUse: "Apply 3-5 drops to towel-dried hair. Focus on highly damaged areas. Do not rinse. Style as usual to activate the heat-responsive repair particles."
    }
];

// Keep backward compatibility
export const mockProducts = shopProducts;
