import { useReducer } from "react";
import { createContext, useEffect } from "react";
import { createAction } from "../utils/reducer/reducer.util";

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

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
    SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };

        default:
            throw new Error(`Unhandled type ${type} in cart reducer`);
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const addItemToCart = (productToAdd) => {
        // setCartItems(addCartItem(cartItems, productToAdd));
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (itemToRemove) => {
        const newCartItems = removeCartItem(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (itemToClear) => {
        const newCartItems = clearCartItem(cartItems, itemToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };

    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce(
            (cartTotal, item) => cartTotal + item.quantity * item.price,
            0
        );
        const newCartCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal,
            })
        );
    };

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
