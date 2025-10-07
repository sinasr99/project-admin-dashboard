import {useRoutes, Navigate} from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Users from "./pages/Dashboard/dashboard-pages/Users";
import Products from "./pages/Dashboard/dashboard-pages/Products";
import Tickets from "./pages/Dashboard/dashboard-pages/Tickets";
import DiscountCodes from "./pages/Dashboard/dashboard-pages/DiscountCodes";
import Comments from "./pages/Dashboard/dashboard-pages/Comments";
import Account from "./pages/Dashboard/dashboard-pages/Account";

const Router = () => {
    return useRoutes([
        {path: "/", element: <Navigate to="/auth"/>},
        {path: "/dashboard", element: <Dashboard/>, children: [
                {path: "users", element: <Users/>},
                {path: "products", element: <Products/>},
                {path: "tickets", element: <Tickets/>},
                {path: "discount-codes", element: <DiscountCodes/>},
                {path: "comments", element: <Comments/>},
                {path: "account", element: <Account/>}
            ]},
        {path: "/auth", element: <Auth/>},
        {path: "/*", element: <NotFound/>}
    ])
}

export default Router