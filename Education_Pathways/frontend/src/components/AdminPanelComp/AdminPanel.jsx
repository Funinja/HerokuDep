import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import CourseRow from './CourseRow';
import './AdminPanel.css';


export function AdminPanel () {
  const [requestedCourses, setRequestedCourses] = useState()
  const [allCourses, setAllCourses] = useState()
  const [courseRows, setCourseRows] = useState()
  const [showAll, setShowAll] = useState(false)
  /*
  Todo:
    - make controller that sends the syllabi collection
    - make a function that populattes a row based on unput
    - make a funcition that iterates throuhg all the courses to create the table
    - make the table
    - style the table
    - pagination? - probably not necessary
    - make an adminPanelRow component so that each row has its own state

  */

  let getRequested = () => {
    if(requestedCourses){
      setCourseRows(populateRows(requestedCourses));
      return;
    }
    axios.get(`http://127.0.0.1:5000/api/syllabusList`)
        .then(res => {
          // Unpack and repack since data is recieved without keys to each entry.
          let courses = {...JSON.parse(res.data)}
          setRequestedCourses(courses);
          setCourseRows(populateRows(courses))
        }
      )
  }
  useEffect(()=>{
    getRequested();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  let getAll = () => {
    if(allCourses){
      setCourseRows(populateRows(allCourses));
      return;
    }
    axios.get(`http://127.0.0.1:5000/api/syllabusList`, {params:{"get_all": true}})
      .then(res => {
        let courses = {...JSON.parse(res.data)}
        console.log(courses)
        setAllCourses(courses);
        setCourseRows(populateRows(courses))
        }
      )
  }

  let populateRows = (courses) => {
    let counter = 0;
    let allRows = Object.values(courses).map(course => {
      return <CourseRow key={counter++} course_code={course["Course Code"]} number_requests={course["request_count"]} syllabus_link={course["link"]}/>
    })
    return allRows;
  }

  let button;
  if(!showAll){
    button = (
      <Button
        as="input"
        className="btn btn-primary filter_list"
        type="button"
        value="Show All"
        onClick={() => {
          getAll();
          setShowAll(true);
        }}
      />
    );
  }else {
    button = (
      <Button
        as="input"
        className="btn btn-primary filter_list"
        type="button"
        value="Show Requested & Linked"
        onClick={() => {
          getRequested();
          setShowAll(false);
        }}
      />
    );
  }

  return (
      <div className='panel'>
        <div className='title'>AdminPanel</div>
        {button}
        <Container>
          <Row>
            <Col className="col-2">Course Code</Col>
            <Col className='col-sm'>Num. Req.</Col>
            <Col className='col-6'>Link</Col>
            <Col className='col-3'>Option</Col>
          </Row>
          {courseRows}
        </Container>
      </div>
  )
}

export default AdminPanel;