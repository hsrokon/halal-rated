import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Shops from "../pages/Shops";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Reviews from "../pages/reviews/Reviews";
import AddReviews from "../pages/addReviews/AddReviews";
import Restaurants from "../pages/Restaurants";
import ShopWishlist from "../pages/ShopWishlist";


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
                path: '/shopWishlist',
                element: <ShopWishlist></ShopWishlist>
            },
            {
                path: '/about',
                element: <ShopWishlist></ShopWishlist>
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