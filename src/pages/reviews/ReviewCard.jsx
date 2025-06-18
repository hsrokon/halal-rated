import { MdArrowOutward } from 'react-icons/md';
import { useEffect, useState } from 'react';

const ReviewCard = ({ review }) => {
  const {
    region,
    country,
    city,
    placeName,
    placeSpecificLocation,
    rating,
    placeType,
    reviewArea,
    halalCertified,
    selectedTags,
    photoURL,
    honestyConsent,
    userDisplay,
    userEmail,
  } = review;

  const [reviewUser, setReviewUser] = useState([]);

  useEffect(() => {
    if (userDisplay) {
      fetch(`http://localhost:5000/users/${userEmail}`)
        .then((res) => res.json())
        .then((data) => setReviewUser(data));
    }
  }, [userDisplay]);

  return (
    <div className="w-11/12 md:w-9/12 mx-auto lg:w-full flex flex-col lg:grid lg:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-md">
      <div className="col-span-1 w-full h-44 md:h-72 lg:h-full">
        <img
          className="w-full h-full object-cover"
          src={photoURL}
          alt={`Image of ${placeName}`}
        />
      </div>
      <div className="col-span-1 flex flex-col gap-1.5 md:gap-2.5 p-6">
        <h3 className="text-sm font-medium uppercase text-gray-500">{placeType}</h3>
        <h1 className="text-xl md:text-2xl font-bold text-[#333] capitalize">{placeName}</h1>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-9 md:h-9">
            <img
              src={reviewUser.photoURL}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h5>{reviewUser.displayName}</h5>
        </div>
        <p className="text-[0.875rem] text-gray-500 font-medium">{reviewArea}</p>

        <div className="rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              type="radio"
              name={`rating ${placeName}`}
              checked={i === rating}
              readOnly
              className="mask mask-star-2 bg-green-700"
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button className="mt-2 bg-[hsl(158,36%,37%)] hover:bg-[hsl(158,36%,27%)] text-white font-medium text-sm md:text-base py-2.5 px-3 rounded-lg flex items-center justify-center transition-colors duration-300 cursor-pointer">
            <span className="mr-2">Visit {placeType}</span>
            <MdArrowOutward size="1.25rem" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
