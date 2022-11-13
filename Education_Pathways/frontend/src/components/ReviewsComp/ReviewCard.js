import React from "react";
import styles from "./ReviewCard.module.css";
import Star from "./Star";

const ReviewCard = ({ firstName, lastName, review, rating }) => {
  return (
    <div className={styles["review-card"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <div>
          <p style={{ margin: 0, display: "inline", color: "#1C3E6E" }}>
            {firstName} {lastName[0]}.
          </p>
        </div>
        <div>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            console.log(rating)
            return (
              <Star
                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              />
            );
          })}
        </div>
      </div>
      <p style={{ margin: 0 }}>{review}</p>
    </div>
  );
};

export default ReviewCard;
