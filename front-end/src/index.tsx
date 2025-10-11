import './styles/output.css'

import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import Router from "./routes";
import {ThemeContextProvider} from "./contextAPI/themeContext"
import cookies from "js-cookie"

window.addEventListener("beforeunload", () => {
    cookies.remove("email-time")
    cookies.remove("phone-time")
    cookies.remove("code-timer")

    localStorage.removeItem("auth-level")
    localStorage.removeItem("otp-level")
})

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