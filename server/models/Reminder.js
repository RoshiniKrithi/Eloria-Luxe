import mongoose from 'mongoose';

const reminderSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    productName: {
        type: String,
        required: true
    },
    remindAt: {
        type: Date,
        required: true
    },
    isSent: {
        type: Boolean,
        default: false
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {
    timestamps: true
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
