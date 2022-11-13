import React from "react";
import ReviewsForm from "./ReviewsForm";
import ReviewsList from "./ReviewsList";
import styles from "./ReviewsComp.module.css";

const ReviewsComp = (props) => {
  return (
    <div className={styles["reviews-comp"]}>
      <ReviewsForm course_code={props.course_code} />
      <ReviewsList reviewsData={props.reviews} />
    </div>
  );
};

export default ReviewsComp;
