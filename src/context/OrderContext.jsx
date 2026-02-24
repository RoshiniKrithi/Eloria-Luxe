import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
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
            ...orderData
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const getOrderById = (id) => {
        return orders.find(order => order.id === id);
    };

    const getOrdersByUser = (email) => {
        return orders.filter(order => order.email === email);
    };

    const value = {
        orders,
        placeOrder,
        getOrderById,
        getOrdersByUser
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
