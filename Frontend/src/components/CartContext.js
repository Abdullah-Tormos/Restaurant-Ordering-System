import {createContext, useState} from 'react'

export const CartContext = createContext();

export function CartProvider({children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            return existing
            ? prev.map((i) => 
                i.id === item.id ? {...i, quantity: i.quantity + 1} : i
            )
            : [...prev, {...item, quantity: 1}];
        });
    }

    const removeFromCart = (id) => {
        setCart((prev) => {
            const existing = prev.find(item => item.id === id);
            if (existing && existing.quantity > 1) {
                return prev.map(item => 
                    item.id === id ? {...item, quantity: item.quantity - 1} : item
                );
            }
            return prev.filter(item => item.id !== id);
        });
    }

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    return (
        <CartContext.Provider value={{
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}