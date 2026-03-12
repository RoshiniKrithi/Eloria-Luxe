import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
};

// Status flow: Processing → Confirmed → Shipped → Out for Delivery → Delivered
const STATUS_FLOW = ['Processing', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

// Returns deterministic timeline milestones for an order based on placement date
const generateTimeline = (placedDate, status) => {
    const base = new Date(placedDate);
    const statusIndex = STATUS_FLOW.indexOf(status);

    const steps = [
        {
            status: 'Processing',
            label: 'Order Placed',
            description: 'Your order has been received and is being reviewed.',
            icon: 'receipt',
            date: new Date(base).toISOString(),
            done: statusIndex >= 0,
        },
        {
            status: 'Confirmed',
            label: 'Order Confirmed',
            description: 'Payment verified. Your items are being prepared.',
            icon: 'check-circle',
            date: new Date(base.getTime() + 1 * 60 * 60 * 1000).toISOString(), // +1 hr
            done: statusIndex >= 1,
        },
        {
            status: 'Shipped',
            label: 'Shipped',
            description: 'Your package is on its way to you.',
            icon: 'package',
            date: new Date(base.getTime() + 24 * 60 * 60 * 1000).toISOString(), // +1 day
            done: statusIndex >= 2,
        },
        {
            status: 'Out for Delivery',
            label: 'Out for Delivery',
            description: 'Your order is with the delivery partner.',
            icon: 'truck',
            date: new Date(base.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // +3 days
            done: statusIndex >= 3,
        },
        {
            status: 'Delivered',
            label: 'Delivered',
            description: 'Your order has been delivered. Enjoy!',
            icon: 'gift',
            date: new Date(base.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(), // +5 days
            done: statusIndex >= 4,
        },
    ];

    return steps;
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem('eloriaOrders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('eloriaOrders', JSON.stringify(orders));
    }, [orders]);

    const placeOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            date: new Date().toISOString(),
            status: 'Processing',
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            ...orderData,
        };
        newOrder.timeline = generateTimeline(newOrder.date, newOrder.status);
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev =>
            prev.map(order => {
                if (order.id !== orderId) return order;
                const updated = { ...order, status: newStatus };
                updated.timeline = generateTimeline(order.date, newStatus);
                return updated;
            })
        );
    };

    const getOrderById = (id) => orders.find(order => order.id === id);

    const getOrdersByUser = (email) => orders.filter(order => order.email === email);

    const value = {
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        getOrdersByUser,
        STATUS_FLOW,
        generateTimeline,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
