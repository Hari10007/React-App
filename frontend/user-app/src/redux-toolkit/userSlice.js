import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
}



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        login: (state,action)=>{
            state.user = action.payload;
        },
        updateUser: (state,action)=>{
            state.user.image = action.payload;
        },
        logout:(state)=>{
            state.user = null
            localStorage.clear();
        }
    }
})


export const{
    login, updateUser, logout
} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export default userSlice.reducer;