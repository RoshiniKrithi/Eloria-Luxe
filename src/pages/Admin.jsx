import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Package, ShoppingCart, Users, Settings, Plus, Search, LogOut } from 'lucide-react';
import { Link, Route, Routes } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { mockProducts } from '../data/products';

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-text-dark text-white min-h-screen p-6 fixed">
            <h2 className="text-2xl font-serif font-bold mb-10 tracking-widest text-center">ELORIA</h2>
            <nav className="space-y-4">
                <Link to="/admin" className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all">
                    <Home size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/admin/products" className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all">
                    <Package size={20} />
                    <span>Products</span>
                </Link>
                <Link to="/admin/orders" className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all">
                    <ShoppingCart size={20} />
                    <span>Orders</span>
                </Link>
                <Link to="/admin/customers" className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all">
                    <Users size={20} />
                    <span>Customers</span>
                </Link>
                <Link to="/admin/settings" className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>
            <div className="absolute bottom-6 left-6 w-52">
                <button className="flex items-center space-x-3 text-red-400 hover:text-red-300 w-full p-3 rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

const AdminDashboard = () => {
    const { orders } = useOrders();
    const products = mockProducts;

    const stats = [
        { label: "Total Sales", value: `$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, change: "+12%" },
        { label: "Total Orders", value: orders.length.toString(), change: "+8%" },
        { label: "New Customers", value: [...new Set(orders.map(o => o.email))].length.toString(), change: "+24%" },
        { label: "Active Products", value: products.length.toString(), change: "0%" },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-serif text-text-dark">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-gray-500 text-sm uppercase tracking-wide mb-2">{stat.label}</h3>
                        <p className="text-2xl font-medium text-text-dark">{stat.value}</p>
                        <span className="text-green-500 text-xs font-semibold">{stat.change} vs last month</span>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-serif text-text-dark">Recent Orders</h3>
                    <button className="text-secondary text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-3 px-4 font-medium text-gray-900">Order ID</th>
                                <th className="py-3 px-4 font-medium text-gray-900">Customer</th>
                                <th className="py-3 px-4 font-medium text-gray-900">Date</th>
                                <th className="py-3 px-4 font-medium text-gray-900">Status</th>
                                <th className="py-3 px-4 font-medium text-gray-900">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-center text-gray-400">No orders placed yet.</td>
                                </tr>
                            ) : (
                                orders.slice(0, 5).map((order) => (
                                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 font-medium text-text-dark">#{order.id}</td>
                                        <td className="py-3 px-4">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</td>
                                        <td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="py-3 px-4">
                                            <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-medium text-text-dark">${order.total?.toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const AdminProducts = () => {
    const [products, setProducts] = useState(mockProducts);

    // Local placeholders since Context is removed
    const addProduct = (product) => {
        const newProd = { ...product, id: Date.now() };
        setProducts([...products, newProd]);
        alert("Product added locally (not persisted)");
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
        alert("Product deleted locally (not persisted)");
    };
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Skincare',
        price: '',
        stock: 100,
        description: ''
    });

    const handleSave = () => {
        if (!newProduct.name || !newProduct.price) return;
        addProduct({
            ...newProduct,
            price: parseFloat(newProduct.price)
        });
        setShowAddForm(false);
        setNewProduct({
            name: '',
            category: 'Skincare',
            price: '',
            stock: 100,
            description: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-serif text-text-dark">Products</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-text-dark text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-secondary transition-colors shadow-lg shadow-secondary/10"
                >
                    <Plus size={18} />
                    <span>{showAddForm ? 'Cancel' : 'Add Product'}</span>
                </button>
            </div>

            {showAddForm ? (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
                    <h3 className="text-xl font-serif mb-6 text-text-dark">New Product Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Product Name</label>
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-secondary/50"
                                placeholder="e.g. Silk Glow Serum"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</label>
                            <select
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-secondary/50"
                            >
                                <option>Skincare</option>
                                <option>Makeup</option>
                                <option>Fragrance</option>
                                <option>Face</option>
                                <option>Cheeks</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Price ($)</label>
                            <input
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-secondary/50"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Stock Quantity</label>
                            <input
                                type="number"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-secondary/50"
                                placeholder="100"
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Description</label>
                            <textarea
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-secondary/50 min-h-[100px]"
                                placeholder="Brief product description..."
                            ></textarea>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-text-dark text-white px-8 py-3 rounded-full hover:bg-secondary transition-all"
                            >
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-50">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="py-4 px-6 font-medium text-gray-900">Product</th>
                                <th className="py-4 px-6 font-medium text-gray-900">Category</th>
                                <th className="py-4 px-6 font-medium text-gray-900">Price</th>
                                <th className="py-4 px-6 font-medium text-gray-900">Status</th>
                                <th className="py-4 px-6 font-medium text-gray-900 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400">No products in inventory.</td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-serif text-gray-400">{product.name[0]}</div>
                                                <span className="font-medium text-text-dark">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">{product.category}</td>
                                        <td className="py-4 px-6">${product.price.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <button className="text-secondary hover:text-text-dark transition-colors font-medium">Edit</button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

const Admin = () => {
    return (
        <div className="flex min-h-screen bg-[#fcfbf9]">
            <AdminSidebar />
            <main className="ml-64 flex-1 p-8 md:p-12 overflow-y-auto w-full">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/products" element={<AdminProducts />} />
                    <Route path="*" element={<AdminDashboard />} />
                </Routes>
            </main>
        </div>
    );
};

export default Admin;
