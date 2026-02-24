# 🌸 Eloria Luxe - Premium Luxury Cosmetics E-Commerce

A stunning, ultra-premium e-commerce website for luxury cosmetics built with React, Vite, and Tailwind CSS.

## ✨ Features

### 🔐 **Hybrid Authentication System**
- **Guest Browsing**: Users can browse products and add to cart without signing in
- **Optional Login**: Login required only for checkout and admin access
- **Guest Checkout**: Quick checkout option without creating an account
- **Protected Admin Panel**: Secure admin routes with authentication guard
- **Persistent State**: Auth and cart data saved to localStorage

### 🛍️ **Shopping Experience**
-  Beautiful product cards with hover animations
- ✅ One-click "Add to Cart" with visual feedback
- 🛒 Real-time cart updates in navbar
- 💚 Wishlist functionality (UI ready)
- 🔍 Product search and filters
- 🏷️ Category-based filtering
- 📱 Fully responsive design

### 🎨 **Premium Design**
- Soft blush pink, champagne gold, and ivory color palette
- Smooth micro-interactions and animations
- Glassmorphism effects
- Custom scrollbar styling
- Elegant typography (Playfair Display + Poppins)
- Hover effects and transitions throughout
- Premium shadows and gradients

### 📄 **Pages**
- 🏠 **Home**: Hero, Featured Products, Categories, Testimonials, Newsletter
- 🛍️ **Shop**: Product grid with search, filters, and sorting
- 📦 **Product Details**: Full product information with gallery
- 🛒 **Cart**: Cart management with guest/authenticated checkout options
- 🔐 **Login**: Beautiful login form with social auth options
- ⚙️ **Admin Panel**: Protected dashboard for administrators

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🔐 Authentication Demo

### Regular User Login
- Use **any email** and password to login as a regular user
- Example: `user@example.com` / `password`

### Admin Access
- Use **`admin@eloria.com`** with any password to access Admin Panel
- Automatically redirects to `/admin` dashboard

### Guest Checkout
- Browse and add products to cart without login
- Click "Guest Checkout" on cart page for quick purchase

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **HTTP Client**: Axios (ready for backend integration)

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components (ProductCard, Newsletter)
│   ├── home/             # Home page sections (Hero, Featured, Categories)
│   └── layout/           # Layout components (Navbar, Footer)
├── context/
│   ├── AuthContext.jsx   # Authentication state management
│   └── CartContext.jsx   # Shopping cart state management
├── data/
│   └── products.js       # Mock product data
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── Admin.jsx
├── App.jsx               # Main app with routing
├── index.css             # Global styles
└── main.jsx              # App entry point
```

## 🎯 Key Features Implementation

### Context Providers
```javascript
// Auth state available throughout app
const { user, isAuthenticated, isAdmin, login, logout } = useAuth();

// Cart state globally accessible
const { cartItems, addToCart, removeFromCart, total, itemCount } = useCart();
```

### Protected Routes
Admin routes are automatically protected:
```javascript
<Route path="/admin/*" element={
  <ProtectedRoute>
    <Admin />
  </ProtectedRoute>
} />
```

### Cart Integration
Products can be added to cart from:
- Product cards (hover icons)
- Product details page
- Featured sections

All cart data persists in localStorage across sessions.

## 🎨 Design Philosophy

- **Minimalist Luxury**: Clean lines, ample white space
- **Premium Feel**: Sophisticated color palette and typography
-  **Smooth Interactions**: Micro-animations enhance user experience
- **Mobile-First**: Responsive design that works beautifully on all devices
- **Accessibility**: Semantic HTML and ARIA labels

## 🌟 Premium Touches

- Animated page transitions
- Product card hover zoom effects
- Cart count badge animations
- Smooth scroll behavior
- Custom toast notifications for cart actions
- Skeleton loading states (ready)
- Dark mode support (ready)

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Real product images
- [ ] Checkout flow completion
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Product reviews
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] Payment integration (Stripe)
- [ ] Advanced search with filters

## 📄 License

This is a demo project created for portfolio purposes.

## 🙏 Credits

- Design inspiration: Dior, Rare Beauty, Fenty Beauty, Sephora
- Icons: Lucide React
- Fonts: Google Fonts (Playfair Display, Poppins)
- Animations: Framer Motion

---

**Built with ❤️ and attention to detail for maximum WOW factor** ✨
