import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ShopDetailsRevCard = ({ id }) => {
  const axiosSecure = useAxiosSecure();
  const { loading, setLoading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [ selectedPhoto, setSelectedPhoto ] = useState(null);

  //fetching reviews
  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  //fetching unique users (batch or sequentially)
  useEffect(() => {
    const uniqueEmails = [...new Set(reviews.map(r => r.userEmail))];
    const missing = uniqueEmails.filter(email => !users[email]);

    if (missing.length) {
      Promise.all(missing.map(email => axiosSecure.get(`/users/${email}`)))
        .then(responses => {
          const newUsers = {};
          responses.forEach((res, idx) => {
            newUsers[missing[idx]] = res.data;
          });
          setUsers(prev => ({ ...prev, ...newUsers }));
        });
    }
  }, [reviews]);

  if (loading) return <p>Loading.......</p>;


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {reviews.length ? (
          reviews.map(review => (
            <ReviewCard 
              key={review._id} 
              review={review} 
              user={users[review.userEmail]} 
              onPhotoClick={()=>setSelectedPhoto(review.photoURL)}//sending onPhotoClick as a prop
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>

        {/* wide screen modal */}
        {
          selectedPhoto && (
            <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={()=> setSelectedPhoto(null)}
            >
              <img 
              src={selectedPhoto} 
              alt="Preview" 
              className="max-w-5xl max-h-[90vh] object-contain rounded-lg shadow-2xl border-4 border-white"
              onClick={ e => e.stopPropagation()} // preventing image closure on click
              />
            </div>
          )
        }

    </>
  );
};

const ReviewCard = ({ review, user, onPhotoClick }) => {
  //receiving onPhotoClick as a prop
  const { displayName, photoURL } = user || {};
  return (
    <div className="border max-h-60 border-gray-200 rounded-xl p-2 shadow-sm hover:shadow-md transition">
      {/* user info */}
      <div className="flex items-center gap-2 mb-2">
        <img
          src={photoURL}
          alt={displayName || review.userEmail}
          className="w-8 h-8 rounded-full object-cover border cursor-pointer"
        />
        <div>
          <p className="font-semibold text-sm cursor-pointer">{displayName || review.userEmail}</p>
          <p className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="cursor-pointer h-20 w-32" 
      onClick={onPhotoClick}//setting photo url 
      >
        <img className="h-full w-full object-cover" src={review.photoURL} alt="" />
      </div>

      {/* rating */}
      <StarRating value={parseInt(review.rating)} />

      {/* review text */}
      <p className="text-gray-700 mb-2">{review.reviewArea}</p>

      {/* tags */}
      <div className="flex flex-wrap gap-2">
        {review.selectedTags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const StarRating = ({ value }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <span 
      key={i} 
      className={`text-2xl ${i < value ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ))}
  </div>
);

export default ShopDetailsRevCard;
