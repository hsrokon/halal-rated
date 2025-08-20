import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ShopCard from "../components/shops/ShopCard";


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

            <div>
                {
                    shops.map(shop => 
                    <ShopCard 
                    key={shop._id}
                    shop={shop}
                    />)
                }
            </div>
        </div>
    );
};

export default Shops;