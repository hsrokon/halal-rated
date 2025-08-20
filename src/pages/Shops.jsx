import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ShopCard from "../components/shops/ShopCard";
import { Link } from "react-router-dom";


const Shops = () => {

    const axiosSecure = useAxiosSecure();
    const [ shops, setShops ] = useState([]);
    
    useEffect(()=> {
        axiosSecure.get('/shops')
        .then(res => setShops(res.data))
    },[])

    return (
        <div className="min-h-screen w-11/12 mx-auto">
            <h1 className="text-center my-4 text-3xl font-semibold">Discover Halal Shops.
                <small className="text-sm pb-1 italic font-light"> ({shops.length} results)</small>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    shops.map(shop => 
                        <Link 
                        key={shop._id}
                        to={shop._id}>
                            <ShopCard 
                            shop={shop}
                            />
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Shops;