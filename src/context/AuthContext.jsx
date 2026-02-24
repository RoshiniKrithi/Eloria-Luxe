import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for saved user
        const savedUser = localStorage.getItem('eloriaUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login - replace with real API call
        const mockUser = {
            id: 1,
            name: email.split('@')[0],
            email: email,
            avatar: null,
            isAdmin: email.includes('admin')
        };
        setUser(mockUser);
        localStorage.setItem('eloriaUser', JSON.stringify(mockUser));
        return { success: true, user: mockUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eloriaUser');
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
