import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, XCircle, Tag } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import ShopDetailsRevCard from "../shopDetails/ShopDetailsRevCard";

const ShopDetails = () => {
    const [ shop, setShop ] = useState(null);
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        axiosSecure.get(`/shops/${id}`)
        .then(res => setShop(res.data))
    },[id])
    

    if (!shop) {
        return <p>Loading........</p>
    }

    const enlistedDate = new Date(shop.enlistedIn).toLocaleDateString();
    
  return (
    <div className="w-8/12 mx-auto mb-20">
      {/* Image */}
      <div className="">
        <figure>
          <img
            src={shop.photoURL}
            alt={shop.placeName}
            className="w-full h-[33rem] object-cover"
          />
        </figure>
        <div className="">
          {/*name */}
          <div className="flex items-center justify-between bg-secondary/80 my-6 py-2 pl-4">
            <h1 className="text-3xl font-bold text-white">{shop.placeName}</h1>
            {shop.halalCertified ? (
              <CheckCircle className="text-success" size={24} title="Halal Certified" />
            ) : ''}
          </div>

          <div className="flex justify-between items-center">
              {/* location */}
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="text-primary" size={26} />
              <div className="flex flex-col ">
                <span>{shop.placeSpecificLocation}</span>
                <span className="mr-auto text-accent">{shop.city}, {shop.country}</span>
              </div>
            </div>

            {/* shop type */}
            {/* <p className="text-sm text-gray-500">Type: {shop.placeType}</p> */}

            {/* tags */}
            <div className="flex flex-wrap gap-2">
              {shop.selectedTags.map((tag, i) => (
                <span key={i} className="badge badge-outline flex text-base items-center gap-1">
                  <Tag className="text-primary" size={20} /> {tag}
                </span>
              ))}
          </div>

          
          </div>

          {/* review count and enlisted */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-base-content hover:underline">Shop Added by : {shop.enlisterEmail}</p>
            <p className="text-sm text-gray-400 hover:text-base-content hover:underline">Enlisted on: <span> </span> {enlistedDate}</p>
          </div>
        </div>

        {/* reviews */} 
        <div className="my-6 flex items-baseline gap-2 divider divider-start before:bg-primary/70 after:bg-primary/70">
          <h4 className="text-2xl text-primary">Reviews:</h4>
          <p className="font-light text-base-content">({shop.reviewCount} {shop.reviewCount === 1 ? "Review" : "Reviews"})</p>
        </div>

        <ShopDetailsRevCard id={id} />

      </div>
    </div>
  );
};

export default ShopDetails;
