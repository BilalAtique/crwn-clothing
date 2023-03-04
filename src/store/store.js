import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const middlewares = [ process.env.NODE_ENV !== "production" && logger, thunk].filter(Boolean);

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
