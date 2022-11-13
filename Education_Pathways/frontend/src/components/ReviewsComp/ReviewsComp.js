import React, {useEffect, useState} from "react";
import ReviewsForm from "./ReviewsForm";
import ReviewsList from "./ReviewsList";
import styles from "./ReviewsComp.module.css";

const ReviewsComp = (props) => {

  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    let temp = 0
    for (let i = 0; i < props.reviews.length; i++) {
      temp += parseInt(props.reviews[i]['rating'])
    }
    setTotalRating(temp)
  })

  return (
    <div className={styles["reviews-comp"]}>
      <h3 style={{ marginBottom: "30px", marginLeft: 0 }}> Average Review: {(totalRating / props.reviews.length).toFixed(2)} <h5>({props.reviews.length} Reviews)</h5> </h3>
      <ReviewsForm course_code={props.course_code} />
      <ReviewsList reviewsData={props.reviews} />
    </div>
  );
};

export default ReviewsComp;
