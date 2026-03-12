import { shopProducts } from '../data/products';

/**
 * AI-Powered Recommendation Service
 * Analyzes purchase patterns from localStorage orders and product attributes
 */

export const getAIRecommendations = (currentProductId, limit = 4) => {
    const currentProduct = shopProducts.find(p => String(p.id) === String(currentProductId));
    if (!currentProduct) return [];

    // 1. Get Purchase Patterns from localStorage Orders
    const orders = JSON.parse(localStorage.getItem('eloriaOrders') || '[]');
    const coOccurrenceMap = {};

    // Calculate how often other products are bought with THE SAME category or specific products
    orders.forEach(order => {
        const itemIds = order.items.map(item => String(item.id));
        if (itemIds.includes(String(currentProductId))) {
            itemIds.forEach(id => {
                if (id !== String(currentProductId)) {
                    coOccurrenceMap[id] = (coOccurrenceMap[id] || 0) + 1;
                }
            });
        }
    });

    // 2. Score All Products
    const scoredProducts = shopProducts
        .filter(p => String(p.id) !== String(currentProductId))
        .map(product => {
            let score = 0;

            // Pattern Match Score (Co-occurrence)
            if (coOccurrenceMap[product.id]) {
                score += coOccurrenceMap[product.id] * 50; // High weight for real purchases
            }

            // Category Match
            if (product.category === currentProduct.category) {
                score += 30;
            }

            // Brand Match
            if (product.brand === currentProduct.brand) {
                score += 10;
            }

            // Price Proximity (Luxury users often buy items in similar price tiers)
            const priceDiff = Math.abs(product.price - currentProduct.price);
            const priceProximity = Math.max(0, 20 - (priceDiff / 10));
            score += priceProximity;

            // "New" boost
            if (product.isNew) {
                score += 5;
            }

            // Ingredient/Keyword Overlap (Content-based)
            const currentKeywords = (currentProduct.ingredients + ' ' + currentProduct.description).toLowerCase();
            const productKeywords = (product.ingredients + ' ' + product.description).toLowerCase();
            
            const sharedKeywords = ['rose', 'gold', 'silk', 'glow', 'serum', 'oil', 'matte', 'diamond', 'caviar', 'hyaluronic'];
            sharedKeywords.forEach(kw => {
                if (currentKeywords.includes(kw) && productKeywords.includes(kw)) {
                    score += 5;
                }
            });

            return { product, score };
        });

    // 3. Sort by Score and return top products
    return scoredProducts
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.product);
};

export const getTrendingProducts = (limit = 4) => {
    // Logic for trending: Most frequently appearing in recent orders OR just random "New" products
    const orders = JSON.parse(localStorage.getItem('eloriaOrders') || '[]');
    const frequency = {};
    
    orders.forEach(order => {
        order.items.forEach(item => {
            frequency[item.id] = (frequency[item.id] || 0) + 1;
        });
    });

    return shopProducts
        .map(p => ({ product: p, score: (frequency[p.id] || 0) + (p.isNew ? 2 : 0) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.product);
};
