import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import districtSlice from "./slices/districts";
import stateOrUtSlice from "./slices/stateOrUt";
import alertSlice from "./slices/alert";
import userSlice from "./slices/users";
import rescueTaskSlice from "./slices/rescueTask";
import helpRequestSlice from "./slices/helpRequests";
import reportSlice from "./slices/reportSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        districts: districtSlice.reducer,
        stateOrUts: stateOrUtSlice.reducer,
        alerts: alertSlice.reducer,
        users: userSlice.reducer,
        rescueTask: rescueTaskSlice.reducer,
        helpRequests: helpRequestSlice.reducer,
        reports: reportSlice.reducer
    },
});

export default store;