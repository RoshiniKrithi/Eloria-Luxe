import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        default: 'Eloria Luxe'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isNew: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        required: true,
        default: 10
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
