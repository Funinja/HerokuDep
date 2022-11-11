import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import StarRating from "./StarRating";
import styles from "./ReviewsForm.module.css";

const ReviewsForm = () => {
  return (
    <Form className={styles["reviews-form"]}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formFirstName">
          <Form.Label>First name:</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last name:</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formReview">
        <Form.Control as="textarea" rows={3} placeholder="Enter review here" />
      </Form.Group>

      <StarRating />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReviewsForm;
