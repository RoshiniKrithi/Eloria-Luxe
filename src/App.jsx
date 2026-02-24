import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import PageLoader from './components/common/PageLoader';
import CustomCursor from './components/common/CustomCursor';
import { useState, useCallback } from 'react';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
          <div className="text-secondary text-sm font-serif tracking-widest uppercase animate-pulse">Authenticating</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}

function PageWrapper({ children }) {
  // Wrapper for page transitions could go here, or handled inside pages
  return children;
}

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    console.log("Loader animation complete. Revealing app...");
    setIsInitialLoading(false);
  }, []);

  return (
    <Router>
      <AuthProvider>

        <CartProvider>
          <OrderProvider>
            <AnimatePresence mode="wait">
              {isInitialLoading && (
                <PageLoader key="loader" onComplete={handleLoaderComplete} />
              )}
            </AnimatePresence>

            <CustomCursor />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInitialLoading ? 0 : 1 }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className={isInitialLoading ? "pointer-events-none" : ""}
            >
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/*" element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Layout>
            </motion.div>
          </OrderProvider>
        </CartProvider>

      </AuthProvider>
    </Router>
  );
}

export default App;
