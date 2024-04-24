import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from '@reduxjs/toolkit'
import products from './reducers/products.js';
import authentication from "./reducers/authentication";
import orders from "./reducers/orders";
import { GoogleOAuthProvider } from '@react-oauth/google';
import shipping from "./reducers/shipping";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: {
        products,
        authentication,
        orders,
        shipping
    }
});

root.render(
    <GoogleOAuthProvider clientId="1035123183395-eahcvrk1bdk7p1ghf3rssi20qm5d542s.apps.googleusercontent.com">
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);