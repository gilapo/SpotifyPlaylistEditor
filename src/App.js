import React from "react";
//import { Home } from "./app/pages";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import MyRouter from "./app/router";

const App = () => {
    return (
        <Provider store={store}>
            <div className="root-container">
                <MyRouter />
            </div>
        </Provider>
    );
};

export default App;
