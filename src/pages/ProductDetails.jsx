import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, Heart, Share2, ShoppingBag, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('50ml');
    const [wasAdded, setWasAdded] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct({
                    ...data,
                    // Fallback for fields not in basic product data
                    rating: data.rating || 4.8,
                    reviews: data.reviews || 120,
                    sizes: data.sizes || ['30ml', '50ml', '100ml'],
                    shades: data.shades || ['#ffe4e1', '#f5deb3', '#d2b48c', '#8b4513'],
                    description: data.description || "Experience the ultimate in skin perfection. Our premium luxury series provides buildable coverage with a natural, radiant finish that lasts all day."
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-40 text-center min-h-screen">
                <div className="w-12 h-12 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto pb-4" />
                <p className="text-gray-500 font-serif">Finding your product...</p>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setWasAdded(true);
        setTimeout(() => setWasAdded(false), 2000);
    };

    const handleQuantityChange = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    return (
        <div className="pt-32 pb-24 bg-[#fcfbf9] min-h-screen">
            <div className="container mx-auto px-6">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-gray-500 font-light">
                    <Link to="/" className="hover:text-text-dark">Home</Link> <span className="mx-2">/</span>
                    <Link to="/shop" className="hover:text-text-dark">Shop</Link> <span className="mx-2">/</span>
                    <span className="text-text-dark font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative group">
                            {/* Main Image Placeholder */}
                            <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-100 flex items-center justify-center text-gray-300 font-serif text-8xl">
                                {product.name[0]}
                            </div>
                            <button className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full text-text-dark hover:text-red-500 transition-colors shadow-sm">
                                <Heart size={20} />
                            </button>
                        </div>
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="w-24 h-24 bg-gray-100 rounded-xl cursor-pointer hover:ring-2 ring-secondary transition-all flex-shrink-0"></div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-8">
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-2 text-secondary mb-2">
                                <span className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={1} />
                                    ))}
                                </span>
                                <span className="text-gray-400 text-sm">({product.reviews} Reviews)</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif text-text-dark mb-4 leading-tight">{product.name}</h1>
                            <p className="text-2xl font-light text-text-dark">${product.price.toFixed(2)}</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed font-light text-lg">{product.description}</p>

                        {/* Options */}
                        <div className="space-y-6 pt-4 border-t border-gray-100">
                            <div>
                                <h4 className="text-sm uppercase tracking-wider font-medium mb-3 text-gray-500">Select Size</h4>
                                <div className="flex space-x-3">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-6 py-2 rounded-full border transition-all ${selectedSize === size
                                                ? 'border-text-dark bg-text-dark text-white shadow-lg'
                                                : 'border-gray-200 text-gray-600 hover:border-text-dark'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm uppercase tracking-wider font-medium mb-3 text-gray-500">Select Shade</h4>
                                <div className="flex space-x-3">
                                    {product.shades.map(shade => (
                                        <button
                                            key={shade}
                                            className="w-10 h-10 rounded-full border-2 border-transparent hover:border-gray-400 focus:border-text-dark transition-all ring-1 ring-gray-100"
                                            style={{ backgroundColor: shade }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-8">
                            <div className="flex items-center border border-gray-200 rounded-full px-4 h-14 w-32 justify-between">
                                <button onClick={() => handleQuantityChange('dec')} className="p-1 hover:text-secondary transition-colors"><Minus size={16} /></button>
                                <span className="font-medium text-lg">{quantity}</span>
                                <button onClick={() => handleQuantityChange('inc')} className="p-1 hover:text-secondary transition-colors"><Plus size={16} /></button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 h-14 rounded-full font-medium tracking-widest uppercase transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 group ${wasAdded ? 'bg-green-600 text-white shadow-green-200' : 'bg-text-dark text-white hover:bg-secondary shadow-secondary/10'}`}
                            >
                                {wasAdded ? (
                                    <>
                                        <CheckCircle size={20} />
                                        <span>Added to Bag</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} className="group-hover:animate-bounce" />
                                        <span>Add to Bag</span>
                                    </>
                                )}
                            </button>

                            <button className="h-14 w-14 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-text-dark hover:border-text-dark transition-all">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
