import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Local storage
import { persistReducer, persistStore } from "redux-persist";
import complainReducer, { loginReducer, adminReducer, selectedComplainReducer } from "../features/counterSlice";


// Persist configurations
const persistConfig = {
    key: "root",
    storage,
};

// Wrap reducers with persistReducer
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);
const persistedComplainReducer = persistReducer(persistConfig, complainReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);
const persistedSelectedComplainReducer = persistReducer(persistConfig, selectedComplainReducer)

export const store = configureStore({
    reducer: {
        complains: persistedComplainReducer,
        login: persistedLoginReducer,
        admin: persistedAdminReducer,
        selectedComplain: persistedSelectedComplainReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist
        }),
});

// Persistor
export const persistor = persistStore(store);

// Type Definitions
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






// import { configureStore } from "@reduxjs/toolkit";
// import complainReducer, { loginReducer, adminReducer } from "../features/counterSlice";


// export const store = configureStore({
//     reducer: {
//         user: complainReducer,
//         login: loginReducer,
//         admin: adminReducer
     
//     },
// });


// export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore['getState']>;

// export type AppDispatch = AppStore['dispatch'];
