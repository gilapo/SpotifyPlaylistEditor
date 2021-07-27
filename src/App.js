import React from "react";
import { Home } from "./app/pages";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <div className="root-container">
                <Home />
            </div>
        </Provider>
    );
};

export default App;
