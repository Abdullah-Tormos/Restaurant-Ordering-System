// frontend/src/components/CartContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create axios instance with base URL
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
  });

  // Add token to requests automatically
  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Load menu items
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const response = await api.get('/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

const login = async (email, password) => {
  console.log('🔵 Login function called');
  
  try {
    // Use axios or fetch
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    
    console.log('🟢 Login API response:', response.data);
    
    if (response.data && response.data.token) {
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Update context state IMMEDIATELY
      setUser(response.data.user);
      
      console.log('🟢 User set in context:', response.data.user);
      console.log('🟢 Token stored in localStorage');
      
      return response.data;
    } else {
      throw new Error('No token received from server');
    }
    
  } catch (error) {
    console.error('🔴 Login error:', error.response?.data || error.message);
    
    // Clear any invalid data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    throw error.response?.data?.error || 'Login failed';
  }
};

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Place order - Direct axios call
  const placeOrder = async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      setCart([]);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Order failed';
    }
  };

  // Cart operations
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      return existing
        ? prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i)
        : [...prev, {...item, quantity: 1}];
    });
  };

  // ... rest of cart operations

  return (
    <CartContext.Provider value={{
      cart,
      menuItems,
      user,
      loading,
      addToCart,
      removeFromCart: (id) => setCart(prev => prev.filter(item => item.id !== id)),
      clearCart: () => setCart([]),
      login,
      register,
      logout,
      placeOrder,
      getCartTotal: () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
}