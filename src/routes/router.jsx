import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/banner/Banner";
import Shops from "../pages/Shops";
import Home from "../pages/Home";
import AddReviews from "../pages/AddReviews";


const router = createBrowserRouter([
    {
        element: <MainLayout></MainLayout>,
        path: '/',
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
])

export default router;