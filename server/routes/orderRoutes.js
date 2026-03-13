import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Reminder from '../models/Reminder.js';

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Public (Simplified)
router.post('/', async (req, res) => {
    const { user, orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    try {
        const order = new Order({
            user,
            orderItems,
            totalPrice
        });

        const createdOrder = await order.save();

        // Premium Feature: Auto-schedule Refill Reminders
        for (const item of orderItems) {
            const product = await Product.findOne({ name: item.name });
            if (product) {
                const usageDays = product.usageDays || 30;
                // Remind 5 days before it runs out
                const remindDate = new Date();
                remindDate.setDate(remindDate.getDate() + (usageDays - 5));

                const reminder = new Reminder({
                    user,
                    product: product._id,
                    productName: product.name,
                    remindAt: remindDate,
                    orderId: createdOrder._id
                });

                await reminder.save();
                console.log(`Scheduled refill reminder for ${product.name} at ${remindDate}`);
            }
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
