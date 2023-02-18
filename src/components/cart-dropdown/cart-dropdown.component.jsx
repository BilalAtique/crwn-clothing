import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-tem/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
    const navigate = useNavigate();

    const goToCheckoutHandler = () => navigate("/checkout");

    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
        </div>
    );
};

export default CartDropdown;
