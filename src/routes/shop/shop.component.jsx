import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Routes, Route} from "react-router-dom"
import { setCategories } from "../../store/categories/categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
import "./shop.styles.scss";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            dispatch(setCategories(categoryMap));
        };
        getCategoriesMap();
    }, [dispatch]);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
