import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Shops from "../pages/Shops";
import Home from "../pages/Home";
import AddReviews from "../pages/AddReviews";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/shops',
                element: <Shops></Shops>
            },
            {
                path: '/addReviews',
                element: <AddReviews></AddReviews>
            }
        ]
    },
    {
        path: '/auth/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/auth/login',
        element: <Login></Login>
    }
])

export default router;