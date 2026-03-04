import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import districtSlice from "./slices/districts";
import stateOrUtSlice from "./slices/stateOrUt";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        districts: districtSlice.reducer,
        stateOrUts: stateOrUtSlice.reducer,
    },
});

export default store;