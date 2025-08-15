import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";


const Reviews = () => {

    const [ reviews, setReviews ] = useState([]);

    useEffect(()=> {
        fetch('http://localhost:5000/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    },[])

    return (
        <div className="w-11/12 mx-auto min-h-screen">
            <h1 className="text-center my-8 lg:my-2 font-semibold text-xl lg:text-3xl">Total Number of Reviews: {reviews.length}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                {
                    reviews.map(review => 
                    <ReviewCard
                    key={review._id}
                    review={review}
                    ></ReviewCard>)
                }
            </div>
            
        </div>
    );
};

export default Reviews;