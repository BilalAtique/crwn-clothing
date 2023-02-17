import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItem from "../cart-tem/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button>Go to checkout</Button>
        </div>
    );
};

export default CartDropdown;
