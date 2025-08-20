import { MapPin, CheckCircle, XCircle, Tag } from "lucide-react";

const ShopCard = ({ shop }) => {
  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl hover:shadow-2xl transition rounded-2xl cursor-pointer">
      <figure>
        <img
          src={shop.photoURL}
          alt={shop.placeName}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-lg text-primary">{shop.placeName}</h2>
          {shop.halalCertified ? (
            <CheckCircle className="text-success" size={20} />
          ) : ''}
        </div>

        {/* location */}
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-1" />
          {shop.city}, {shop.country}
        </div>

        {/* specific location */}
        <p className="text-sm text-gray-500">{shop.placeSpecificLocation}</p>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {shop.selectedTags?.map((tag, i) => (
            <span key={i} className="badge badge-outline flex items-center gap-1 text-secondary">
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>

        {/* Review count */}
        <p className="text-sm mt-3 text-accent ">
          {shop.reviewCount} {shop.reviewCount === 1 ? "Review" : "Reviews"}
        </p>
      </div>
    </div>
  );
};

export default ShopCard;
