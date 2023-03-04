import "./cart-dropdown.styles";
import Button from "../button/button.component";
import CartItem from "../cart-tem/cart-item.component";
import { useNavigate } from "react-router-dom";
import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage,
} from "./cart-dropdown.styles";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";

const CartDropdown = () => {
    const navigate = useNavigate();

    const goToCheckoutHandler = () => navigate("/checkout");

    const cartItems = useSelector(selectCartItems);
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
