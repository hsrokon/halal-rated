import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle, XCircle, Tag } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";

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
    <div className="w-8/12 mx-auto mb-4">
      {/* Image */}
      <div className="">
        <figure>
          <img
            src={shop.photoURL}
            alt={shop.placeName}
            className="w-full h-[33rem] object-cover"
          />
        </figure>
        <div className="card-body p-6">
          {/*name */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{shop.placeName}</h1>
            {shop.halalCertified ? (
              <CheckCircle className="text-success" size={24} title="Halal Certified" />
            ) : ''}
          </div>

          {/* location */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} />
            <span>{shop.placeSpecificLocation}</span>
            <span className="ml-auto text-sm text-gray-500">{shop.city}, {shop.country}</span>
          </div>

          {/* shop type */}
          <p className="text-sm text-gray-500">Type: {shop.placeType}</p>

          {/* tags */}
          <div className="flex flex-wrap gap-2">
            {shop.selectedTags.map((tag, i) => (
              <span key={i} className="badge badge-outline flex items-center gap-1">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>

          {/* review count and enlisted */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-700">{shop.reviewCount} {shop.reviewCount === 1 ? "Review" : "Reviews"}</p>
            <p className="text-sm text-gray-400">Enlisted on: {enlistedDate}</p>
          </div>

          {/* contact */}
          <p className="text-sm text-gray-600">Added by: {shop.enlisterEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
