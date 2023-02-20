import { CartItemsContainer, Image, ItemDetails } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
    const { name,imageUrl, price, quantity } = cartItem;
    return (
        <CartItemsContainer>
            <Image src={imageUrl} alt={name} />
            <ItemDetails>
                <span className="name">{name}</span>
                <span className="price">{quantity} x {price}</span>
            </ItemDetails>
        </CartItemsContainer>
    );
};

export default CartItem;
