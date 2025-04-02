import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Local storage
import { persistReducer, persistStore } from "redux-persist";
import complainReducer, { loginReducer, adminReducer } from "../features/counterSlice";


// Persist configurations
const persistConfig = {
    key: "root",
    storage,
};

// Wrap reducers with persistReducer
const persistedLoginReducer = persistReducer(persistConfig, loginReducer);
const persistedUserReducer = persistReducer(persistConfig, complainReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        login: persistedLoginReducer,
        admin: persistedAdminReducer,
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
