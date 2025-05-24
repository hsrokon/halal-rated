import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/banner/Banner";
import Shops from "../pages/Shops";
import Home from "../pages/Home";


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
            }
        ]
    },
])

export default router;