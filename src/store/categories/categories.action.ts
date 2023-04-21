import { Action, ActionWithPayload, createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

export type FetchCategoriesStart =  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>  

export type FetchCategoriesSuccess =  ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>  

export type FetchCategoriesFailed =  ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>  

export const fetchCategoriesStart = (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

export const fetchCategoriesSuccess = (categoriesArray: Category[]):FetchCategoriesSuccess =>
    createAction(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        categoriesArray
    );

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoryMap = await getCategoriesAndDocuments();
//         dispatch(fetchCategoriesSuccess(categoryMap));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// };
