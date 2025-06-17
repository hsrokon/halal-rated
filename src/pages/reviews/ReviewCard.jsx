import { AiOutlineHeart } from 'react-icons/ai';
import './card.css';
import { FaHeart } from 'react-icons/fa';
import { MdArrowOutward } from 'react-icons/md';

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

  return (
    <div className="review-card-wrapper grid grid-cols-2 w-full">
      <div className='h-full col-span-1 w-full'>
          <img className='h-full w-full object-cover' src={photoURL} alt={`Image of ${placeName}`} />
      </div>
      <div className="review-card-body col-span-1">
        <h3 className="review-smalltitle">{placeType}</h3>
        <h1 className="review-title">{placeName}</h1>
        <p className="review-description">
          {reviewArea}
        </p>
        <div className='rating'>
          {
            [1, 2, 3, 4, 5].map(i => <input 
              key={i}
              type="radio" 
              name={`rating ${placeName}`}
              checked= {i===rating}
              readOnly
              className={`mask mask-star-2 bg-green-700`}
              />)
          }
          
        </div>
        {/* this is for shop rating */}
        {/* <div className="rating">
          {[1, 2, 3, 4, 5].map((i) => {
            const full = i <= Math.floor(rating);
            const half = i - rating > -1 && i - rating < 1;

            return (
              <input
                key={i}
                type="radio"
                name={`rating-${placeName}`}
                className={`mask mask-star-2 ${
                  full
                    ? 'bg-green-700'
                    : half
                    ? 'bg-green-300'
                    : 'bg-base-200'
                }`}
                checked
                readOnly
              />
            );
          })}
        </div> */}

        <div className='flex gap-2'>
            <button className="review-button">
            <AiOutlineHeart size="1.5rem" />
            <span className="review-button-text">Add to Wishlist</span>
            </button>
            <button className="review-button">
            <MdArrowOutward size="1.5rem" />
            <span className="review-button-text">Visit it</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
