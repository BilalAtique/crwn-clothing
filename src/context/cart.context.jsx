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

const removeCartItem = (cartItems, itemToRemove) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === itemToRemove.id) {
            --cartItems[i].quantity;
            if (cartItems[i].quantity === 0)
                cartItems = cartItems.filter(
                    (item) => item.id !== itemToRemove.id
                );
            return [...cartItems];
        }
    }
};

const clearCartItem = (cartItems, itemToClear) => {
    cartItems = cartItems.filter((item) => item.id !== itemToClear.id);
    return [...cartItems];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems, itemToRemove));
    };

    const clearItemFromCart = (itemToClear) => {
        setCartItems(clearCartItem(cartItems, itemToClear));
    };

    useEffect(() => {
        setCartCount(
            cartItems.reduce((total, item) => total + item.quantity, 0)
        );
    }, [cartItems]);

    useEffect(() => {
        setCartTotal(
            cartItems.reduce(
                (cartTotal, item) => cartTotal + item.quantity * item.price,
                0
            )
        );
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        cartTotal,
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
