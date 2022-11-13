import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "./ReviewsForm.module.css";
import axios from "axios";
import qs from "qs";
import ReviewsContext from "../../context/ReviewsContext";
// import { AiFillStar } from "react-icons/ai";
import Star from './Star';

const ReviewsForm = (props) => {
  const [enteredFirstName, setFirstName] = useState("");
  const [enteredLastName, setLastName] = useState("");
  const [enteredReview, setReview] = useState("");
  const [enteredRating, setRating] = useState(0);

  const [hover, setHover] = useState(null);

  const {reviews, setReviews} = useContext(ReviewsContext);

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const reviewChangeHandler = (event) => {
    setReview(event.target.value);
  };

  const addReview = (firstName, lastName, review, rating) => {
    axios.get(`http://127.0.0.1:5000/course/addreview`, {
      params: {
        courseCode: props.course_code,
        firstName: firstName,
        lastName: lastName,
        review: review,
        stars: rating,
      },
    })
    .then(() => {
      fetchLatestReview()
    });
  };

  const fetchLatestReview = () => {
    axios.get(`http://127.0.0.1:5000/course/reviews`, {
      params:{
        courseCode: props.course_code,
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
      .then(res => {
        let temp_reviews = JSON.parse(res.data["reviews"])
        console.log(temp_reviews)
        setReviews(temp_reviews);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setFirstName("");
    setLastName("");
    setReview("");
    setRating(0);

    addReview(enteredFirstName, enteredLastName, enteredReview, enteredRating);
  };

  return (
    <Form className={styles["reviews-form"]} onSubmit={submitHandler}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>First name:</Form.Label>
          <Form.Control
            type="text"
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            placeholder="Enter first name"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last name:</Form.Label>
          <Form.Control
            type="text"
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            placeholder="Enter last name"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formReview">
        <Form.Control
          as="textarea"
          rows={3}
          value={enteredReview}
          onChange={reviewChangeHandler}
          placeholder="Enter review here"
        />
      </Form.Group>

      <div className={styles["star-rating"]}>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              className={styles["star-input"]}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <Star
              color={ratingValue <= (hover || enteredRating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)} 
            />
          </label>
        );
      })}
    </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewsForm;
