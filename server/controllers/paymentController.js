import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// Initialize Razorpay instance
console.log('Razorpay Key ID in Backend:', process.env.RAZORPAY_KEY_ID);
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a payment order from Razorpay
// @route   POST /api/payment/create-order
// @access  Public
export const createOrder = async (req, res) => {
    try {
        const { amount, receipt } = req.body;
        
        const options = {
            amount: Math.round(amount * 100), // convert to paise
            currency: 'INR', 
            receipt: receipt,
        };

        const order = await razorpay.orders.create(options);
        
        if (!order) {
            return res.status(500).json({ success: false, message: 'Some error occurred while creating order' });
        }
        
        res.json({ success: true, order });
    } catch (error) {
        console.error('Error creating razorpay order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify payment signature
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId // Our DB order ID
        } = req.body;

        const secret = process.env.RAZORPAY_KEY_SECRET;

        // Creating expected signature
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
             // Payment successful, update the order in DB
             const order = await Order.findById(orderId);
             
             if (order) {
                 order.isPaid = true;
                 order.paidAt = Date.now();
                 order.razorpayOrderId = razorpay_order_id;
                 order.razorpayPaymentId = razorpay_payment_id;
                 order.razorpaySignature = razorpay_signature;
                 
                 await order.save();
                 
                 res.json({ success: true, message: 'Payment verified and order updated successfully' });
             } else {
                 res.status(404).json({ success: false, message: 'Order not found in database' });
             }
        } else {
            // Payment Failed
            res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
