import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = login(email, password);
        if (result.success) {
            // Navigate based on user role
            if (result.user.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    };

    // Redirect if already logged in
    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen items-center bg-white justify-center py-12 px-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#fcfbf9] to-[#f4f1ea] -z-10 skew-x-12 origin-top opacity-50 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-[#ffe4e6] to-[#fdf2f8] -z-10 skew-x-12 origin-bottom opacity-50 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-10 bg-white/80 backdrop-blur-md rounded-[2rem] shadow-2xl flex flex-col justify-center relative z-20 overflow-hidden border border-gray-100"
            >
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-serif text-text-dark mb-3">Welcome Back</h1>
                    <p className="text-gray-500 font-light text-lg">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-50 text-red-600 px-4 py-3 rounded-2xl text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-12 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-text-dark placeholder-gray-400"
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-12 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-text-dark placeholder-gray-400"
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <label className="flex items-center cursor-pointer hover:text-text-dark transition-colors">
                            <input type="checkbox" className="mr-2 accent-secondary rounded" />
                            Keep me signed in
                        </label>
                        <Link to="/forgot-password" className="hover:text-secondary transition-colors">Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-text-dark text-white rounded-full font-medium tracking-widest uppercase hover:bg-secondary transition-all duration-300 shadow-xl shadow-secondary/20 flex items-center justify-center group"
                    >
                        <span>Sign In</span>
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div>
                        <div className="flex items-center py-4">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">Or Continue With</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <button type="button" className="flex items-center px-6 py-3 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-secondary transition-all text-sm text-gray-600">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                                Google
                            </button>
                            <button type="button" className="flex items-center px-6 py-3 border border-gray-200 rounded-full hover:bg-gray-50 hover:border-secondary transition-all text-sm text-gray-600">
                                <img src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" className="w-5 h-5 mr-2" />
                                Apple
                            </button>
                        </div>
                    </div>

                    <div className="text-center pt-6 text-sm text-gray-500 border-t border-gray-100">
                        Not a member? <Link to="/signup" className="text-secondary font-medium hover:underline">Create Account</Link>
                    </div>

                    <div className="text-center pt-4">
                        <p className="text-xs text-gray-400 mb-2">For demo, use any email (use "admin@eloria.com" for admin access)</p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
