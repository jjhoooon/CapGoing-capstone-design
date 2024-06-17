import { configureStore, combineReducers } from "@reduxjs/toolkit";
import recipesReducer from './recipesSlice'
import authenticateReducer from "./authenticateReducer";

const rootReducer = combineReducers({
    recipes: recipesReducer,
    auth: authenticateReducer
})

const store = configureStore({
    reducer: rootReducer,
})

export default store