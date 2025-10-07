import './styles/output.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import Router from "./routes";
import {ThemeContextProvider} from "./contextAPI/themeContext"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);
root.render(
    <BrowserRouter>
        <ThemeContextProvider>
            <Router/>
        </ThemeContextProvider>
    </BrowserRouter>
)