import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const { cartItems, setCartItems } = useContext(CartContext);

    const handleAddCart = () => {
        setCartItems([...cartItems, { name, imageUrl, price }]);
    };

    console.log(cartItems);

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={handleAddCart}>
                Add to cart
            </Button>
        </div>
    );
};

export default ProductCard;
