import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    authenticate: false
}

const authenticateSlice = createSlice({
    name: "authenticate",
    initialState,
    reducers: {
        login(state, action) {
            state.id = action.payload.id;
            state.authenticate = true;
        },
        logout(state, action) {
            state.id = "";
            state.authenticate = false;
        }
    }
})

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer