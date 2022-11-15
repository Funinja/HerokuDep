import React, {useState, useEffect, useContext} from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewsList.module.css";
import ReviewsContext from "../../context/ReviewsContext";

const ReviewsList = ({ reviewsData }) => {
  // const reviews = useContext(ReviewsContext)
  // const [data, setData] = useState(reviewsData);
  const {reviews, setReviews} = useContext(ReviewsContext);

  // useEffect(() => {
  //   setData(reviews);
  //   console.log('reviews changed!');
  // }, [reviews])

  return (
    <ul className={styles["reviews-list"]}>
      {reviews.reverse().map((review) => {
        return (
          <li>
            <ReviewCard
              firstName={review['first']}
              lastName={review['last']}
              review={review['review']}
              rating={review['rating']}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewsList;
