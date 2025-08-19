import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Shops from "../pages/Shops";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Reviews from "../pages/reviews/Reviews";
import AddReviews from "../pages/addReviews/AddReviews";
import Restaurants from "../pages/Restaurants";
import ResetPassword from "../pages/ResetPassword";
import ViewAll from "../pages/ViewAll";
import About from "../pages/About";


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
                path: '/restaurants',
                element: <Restaurants></Restaurants>
            },
            {
                path: '/reviews',
                element: <Reviews></Reviews>
            },
            {
                path: '/addReviews',
                element: <AddReviews></AddReviews>
            },
            {
                path: '/viewAll',
                element: <ViewAll></ViewAll>
            },
            {
                path: '/about',
                element: <About></About>
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
    },
    {
        path: '/auth/resetPassword',
        element: <ResetPassword></ResetPassword>
    }
])

export default router;