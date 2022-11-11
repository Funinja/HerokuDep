import React from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewsList.module.css";

const ReviewsList = ({ reviewsData }) => {
  return (
    <ul className={styles["reviews-list"]}>
      {reviewsData.map((review) => {
        return (
          <li>
            <ReviewCard
              firstName={review.first}
              lastName={review.last}
              review={review.review}
              rating={review.rating}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewsList;
