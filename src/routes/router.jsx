import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/banner/Banner";
import Shops from "../pages/Shops";
import Home from "../pages/Home";
import AddReviews from "../pages/AddReviews";
import SignUp from "../pages/SignUp";


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
    }
])

export default router;