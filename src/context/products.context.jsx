import { createContext, useState } from "react";
import PRODUCT_DATA from "../shop-data.json";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCT_DATA);
    const value = { products, setProducts };
    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};
