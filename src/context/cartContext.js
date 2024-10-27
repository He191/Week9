"use client"

import { createContext, useEffect, useState } from "react"

export const CartContext = createContext();

export function CartProvider({ children }){

    const [cart, setCart] = useState([]);

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            if (Array.isArray(parsedCart)) { // Ensure it's an array
                setCart(parsedCart); // Parse the JSON string
            }
        }
    }, []); // Dependency array is empty to run only once

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart as a JSON string
    }, [cart]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart"); // Optionally remove from localStorage as well
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );

}