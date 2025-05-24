import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/banner/Banner";


const router = createBrowserRouter([
    {
        element: <MainLayout></MainLayout>,
        path: '/',
        children: [
            {
                path: '/',
                element: <Banner></Banner>
            }
        ]
    }
])

export default router;