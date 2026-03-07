import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import districtSlice from "./slices/districts";
import stateOrUtSlice from "./slices/stateOrUt";
import alertSlice from "./slices/alert";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        districts: districtSlice.reducer,
        stateOrUts: stateOrUtSlice.reducer,
        alerts: alertSlice.reducer
    },
});

export default store;