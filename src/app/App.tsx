import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import store from "../redux/store";
import AppRoutes from "./Routes";

function App() {
    return (
        <>
            <StrictMode>
                <Provider store={store}>
                    <BrowserRouter>

                        <AppRoutes />

                    </BrowserRouter>
                </Provider>
            </StrictMode>
        </>
    );
}

export default App;