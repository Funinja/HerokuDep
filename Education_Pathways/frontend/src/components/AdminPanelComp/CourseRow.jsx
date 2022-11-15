import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";

function CourseRow({course_code, number_requests, syllabus_link}) {
  const [syllabusLink, setSyllabusLink] = useState(syllabus_link);
  const [showInput, setShowInput] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    setShowInput(false);
    setSyllabusLink(data.syllabusURL);
    axios
      .post(`http://127.0.0.1:5000/course/syllabus`, {course_code: course_code, link: data.syllabusURL})
      .then(resp => console.log(JSON.parse(resp.data)))
      .catch((err) => {
        console.log(err);
      });
  }

  let requestElement = <Col className='coll col-sm'>{number_requests ? number_requests : 0}</Col>
  let linkElement, buttonElement;
  // Theres a link, and an option to change
  if(syllabusLink && !showInput){
    linkElement = (
      <Col className="coll col-7 col-link">
        <a href={syllabusLink}>{syllabusLink}</a>
      </Col>
    );
    buttonElement = (
      <Col className='coll col-sm'>
        <Button
          as="input"
          className="btn btn-primary link-button"
          type="button"
          value="Change Link"
          onClick={() => {
            setShowInput(true);
          }}
        />
      </Col>
    );
  }else {
    // There no link, but an option to add a link
    if(showInput === false) {
      linkElement = (<Col className="coll col-7 col-link"/>);
      buttonElement = (
        <Col className="coll col-sm">
          <Button
            as="input"
            className="btn btn-primary link-button"
            type="button"
            value="Add Link"
            onClick={() => {
              setShowInput(true);
            }}
          />
        </Col>
      );
    }else {
      // Change or add a link
      linkElement = <Col className='coll col-9'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("syllabusURL")} />
          <button type="submit">Submit</button>
        </form>
      </Col>
    }
  }
  return (
    <Row className='roww'>
      <Col className='coll col-2'>{course_code}</Col>
      {requestElement}
      {linkElement}
      {buttonElement}
    </Row>
  )
}

export default CourseRow