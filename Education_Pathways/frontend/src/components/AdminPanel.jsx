import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form";
import { Button } from 'react-bootstrap';


export function AdminPanel () {
  const { register, handleSubmit } = useForm();
  // componentDidMount() {

  // }
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
  const handleChange = (event) => {
    event.preventDefault();
    this.setState({input: event.target.value});
  };
  const onSubmit = (data, e) => {

  };
  const addInput = (event) => {
    //Remove the add button, replace with the submit
    console.log(event.target.parentElement)
    let div = event.target.parentElement
    // debugger;
    div.firstChild.remove()
    // debugger;
    let elem = React.createElement(<form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("firstName")} />
    <input {...register("lastName")} />
    <button type="submit">Submit</button>
  </form>)
    div.appendChild(
    elem)
  };
  const createRow = (course_code, number_requests, syllabus_link) => {
    let requestElement = <Col className='col-item numRequests'><p>{number_requests ? number_requests : 0}</p></Col>
    let linkElement;
    if(syllabus_link){
      linkElement = <Col className='col-item linkDefined'><a href={syllabus_link}>{syllabus_link}</a></Col>
    }else {
      linkElement = <Col><Button as="input" className='btn btn-primary add_link' type="button" value="Add Link" onClick={addInput}/></Col>
    }
    return (
      <Row>
        <Col>course_code</Col>
        {requestElement}
        {linkElement}
      </Row>
    )
      
      // <Col className='col-item linkSubmit'>
      //   <form onSubmit={this.handleSubmit} className={"linkSubmitForm"}>
      //     <input placeholder={"Enter Link"} className={"text-input"} type="text" value={this.state.input} onChange={this.handleChange} />
      //     <input type="submit" value="Search" className={"submit-button"}/>
      //   </form>
      // </Col>
  }
  return (
      <div>
        <div>AdminPanel</div>
        <Container>
          {createRow("ECETEST","56","google.com")}
          {createRow("ECETEST","56",undefined)}
        </Container>
      </div>
  )
}

export default AdminPanel