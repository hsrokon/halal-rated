import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Shops = () => {

    const axiosSecure = useAxiosSecure();
    const [ shops, setShops ] = useState([]);
    
    useEffect(()=> {
        axiosSecure.get('/shops')
        .then(res => setShops(res.data))
    },[])

    console.log(shops);
    

    return (
        <div className="min-h-screen">
            <h1>total shops {shops.length}</h1>
        </div>
    );
};

export default Shops;