import { createSlice } from "@reduxjs/toolkit";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import type { Complains, login, Admin } from '../../types_this_is_exhausting/types'


interface ComplainState {
    complain: Complains | null;
}

interface LoginState {
    login: boolean;
}



interface adminState {
    admin: Admin | null
}





const initialComplainState: ComplainState = {
    complain: null,
};

const initialLoginState: LoginState = {
    login: false,
};

const intialAdminState: adminState = {
    admin: null
};

const complainSlice = createSlice({
    name: "complain",
    initialState: initialComplainState,
    reducers: {
        setComplain: (state, action: PayloadAction<Complains>) => {
            state.complain = action.payload;
        },
        clearUser: (state) => {
            state.complain = null;
        },      
    },
 
});

const loginSlice = createSlice({
    name: "login",
    initialState: initialLoginState,
    reducers: {
        logout: (state) => {
            state.login = false;
        },
        loginAction: (state) => {
            state.login = true;
        },
    },
});

const adminSlice = createSlice({
    name: "admin",
    initialState: intialAdminState,
    reducers: {
        setAdmin: (state, action: PayloadAction<Admin>) => {
            state.admin = action.payload;
        },
        resetAdmin: (state, action: PayloadAction<Admin>) => {
            state.admin = action.payload;
        }
    }
})
   const  myFunction = () => {
    console.log("Hello");
}


export const { setComplain, clearUser } = complainSlice.actions;
export const { logout, loginAction } = loginSlice.actions;
export default  complainSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const adminReducer = adminSlice.reducer;
