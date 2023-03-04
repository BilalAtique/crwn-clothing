import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import { selectCategoriesMap } from "../../store//categories/categories.selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    
    return (
        <>
            {Object.keys(categoriesMap).map((title) => (
                    <CategoryPreview key={title } title={title} products={categoriesMap[title]} />
            ))}
        </>
    );
};

export default CategoriesPreview;
