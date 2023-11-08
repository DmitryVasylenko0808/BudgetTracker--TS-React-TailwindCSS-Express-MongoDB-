import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    id: string,
    login: string,
    sum: number,
    token: string | null
};

const initialState: AuthState = {
    id: "",
    login: "",
    sum: 0,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, { payload }) => {
            localStorage.setItem("token", payload.token);

            state.id = payload._id;
            state.login = payload.login;
            state.sum = payload.sum;
            state.token = payload.token;
        },
        logOut: (state) => {
            localStorage.removeItem("token");

            state.id = "";
            state.login = "";
            state.sum = 0;
            state.token = null;
        }
    }
});

export const { setUserInfo, logOut } = authSlice.actions;
export default authSlice.reducer;