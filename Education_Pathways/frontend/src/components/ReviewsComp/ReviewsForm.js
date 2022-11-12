import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import StarRating from "./StarRating";
import styles from "./ReviewsForm.module.css";
import axios from "axios";

const ReviewsForm = (props) => {
  const [enteredFirstName, setFirstName] = useState("");
  const [enteredLastName, setLastName] = useState("");
  const [enteredReview, setReview] = useState("");

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value);
  };

  const reviewChangeHandler = (event) => {
    setReview(event.target.value);
  };

  const addReview = (firstName, lastName, review) => {
    axios.get(`http://127.0.0.1:5000/course/addreview`, {
      params: {
        courseCode: props.course_code,
        firstName: firstName,
        lastName: lastName,
        review: review,
        stars: 0,
      },
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setFirstName("");
    setLastName("");
    setReview("");

    addReview(enteredFirstName, enteredLastName, enteredReview);
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

      <StarRating />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewsForm;
