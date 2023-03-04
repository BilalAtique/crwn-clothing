import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";


export const setIsCartOpen = (bool) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
    // setCartItems(addCartItem(cartItems, productToAdd));
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

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