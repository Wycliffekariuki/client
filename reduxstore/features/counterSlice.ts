import { createSlice } from "@reduxjs/toolkit";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import type { Complains, complainSelected, login, Users } from '../../types_this_is_exhausting/types'


interface ComplainState {
    complain: Complains[] | [];
}

interface LoginState {
    login: boolean;
}



interface adminState {
    admin: Users | null
}


const initialComplainSelectedState : complainSelected = {
    index: 0,
}

const initialComplainState: ComplainState = {
    complain: [],
};

const initialLoginState: LoginState = {
    login: false,
};

const intialAdminState: adminState = {
    admin: null
};

const selectedComplainSlice = createSlice({
    name: "selectedComplain",
    initialState: initialComplainSelectedState,
    reducers: {
        setSelectedComplain: (state, action: PayloadAction<complainSelected>) => {
            state.index = action.payload.index;
        },
        resetSelectedComplain: (state) => {
            state.index = 0;
        }
    }
})

const complainSlice = createSlice({
    name: "complain",
    initialState: initialComplainState,
    reducers: {
        setComplain: (state, action: PayloadAction<Complains>) => {
            state.complain = [action.payload];
        },
        clearUser: (state) => {
            state.complain = [];
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
        setAdmin: (state, action: PayloadAction<Users>) => {
            state.admin = action.payload;
        },
        resetAdmin: (state, action: PayloadAction<Users>) => {
            state.admin = action.payload;
        }
    }
})
   


export const { setComplain, clearUser } = complainSlice.actions;
export const { logout, loginAction } = loginSlice.actions;
export default  complainSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const adminReducer = adminSlice.reducer;
export const selectedComplainReducer = selectedComplainSlice.reducer;
