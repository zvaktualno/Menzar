import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { configureStore } from "@reduxjs/toolkit";
import createRootReducer from "./Reducer";
import { setCurrentUser, setToken } from "./components/Login/LoginActions"; // new imports
import { isEmpty } from "./utils/Utils"; // new imports

const smth = ({ children, initialState = {} }) => {
    const history = createBrowserHistory();
    const middleware = [thunk, routerMiddleware(history)];

    const store = configureStore({
        reducer: createRootReducer(history),
        middleware: middleware,
        preloadedState: initialState,
    });

    // check localStorage
    if (!isEmpty(localStorage.getItem("token"))) {
        store.dispatch(setToken(localStorage.getItem("token")));
    }

    if (!isEmpty(localStorage.getItem("user"))) {
        const user = JSON.parse(localStorage.getItem("user"));
        store.dispatch(setCurrentUser(user, ""));
    }

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
        </Provider>
    );
};
export default smth;
