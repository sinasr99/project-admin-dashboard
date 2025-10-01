import {useRoutes, Navigate} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const Router = () => {
    return useRoutes([
        {path: "/", element: <Navigate to="/auth"/>},
        {path: "/dashboard", element: <Dashboard/>},
        {path: "/auth", element: <Auth/>},
        {path: "/*", element: <NotFound/>}
    ])
}

export default Router