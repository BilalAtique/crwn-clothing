import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === productToAdd.id) {
            ++cartItems[i].quantity;
            return [...cartItems];
        }
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };
    
    useEffect(()=> {
        setCartCount(
            cartItems.reduce((total, item) => total + item.quantity, 0)
        );
    }, [cartItems])

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
