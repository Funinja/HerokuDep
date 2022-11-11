import React from "react";
import styles from "./ReviewCard.module.css";

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
          <p style={{ margin: 0, display: "inline" }}>{rating}</p>
        </div>
      </div>
      <p style={{ margin: 0 }}>{review}</p>
    </div>
  );
};

export default ReviewCard;
