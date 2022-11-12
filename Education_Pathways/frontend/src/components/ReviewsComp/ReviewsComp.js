import React from "react";
import ReviewsForm from "./ReviewsForm";
import ReviewsList from "./ReviewsList";
import styles from "./ReviewsComp.module.css";

const SAMPLE_DATA = [
  {
    first: "Michael",
    last: "Hong",
    review: "I hate this course!",
    rating: 4,
  },
  {
    first: "David",
    last: "Kim",
    review: "I love this course!",
    rating: 3,
  },
  {
    first: "Jenny",
    last: "Kim",
    review: "I failed this course!",
    rating: 2,
  },
];

const ReviewsComp = (props) => {
  return (
    <div className={styles["reviews-comp"]}>
      <ReviewsForm course_code={props.course_code} />
      <ReviewsList reviewsData={props.reviews} />
    </div>
  );
};

export default ReviewsComp;
