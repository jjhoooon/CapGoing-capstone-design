import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: [],
}

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addToRecipes: (state, action) => {
            state.recipes.push(action.payload)
        },
    }
})

export const { addToRecipes } = recipesSlice.actions
export default recipesSlice.reducer