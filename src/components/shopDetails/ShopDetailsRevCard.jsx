import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ShopDetailsRevCard = ({id}) => {

    const axiosSecure = useAxiosSecure();

    const [ reviews, setReviews ] = useState([]);
    useEffect(()=>{
      axiosSecure.get(`/reviews/${id}`)
      .then(res => setReviews(res.data))
    },[])



    return (
        <div>
            {/* Review Cards */}
            <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                <div
                    key={review._id.$oid}
                    className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-4 mb-3">
                    <img
                        src={review.photoURL}
                        alt={review.userEmail}
                        className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                        <p className="font-semibold">{review.userEmail}</p>
                        <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <span
                        key={i}
                        className={`text-lg ${i < review.rating.$numberInt ? "text-yellow-400" : "text-gray-300"}`}
                        >
                        ★
                        </span>
                    ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 mb-2">{review.reviewArea}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                    {review.selectedTags.map((tag, i) => (
                        <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                        {tag}
                        </span>
                    ))}
                    </div>
                </div>
                ))
            ) : (
                <p className="text-gray-500 italic">No reviews yet.</p>
            )}
            </div>

        </div>
    );
};

export default ShopDetailsRevCard;