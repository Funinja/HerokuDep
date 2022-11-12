import React, { Component } from 'react';
import './css/course-description.css'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import requisite_label from './img/requisite-label.png'
import empty_star from './img/star.png'
import starred from './img/starred.png'
import axios from "axios"
import qs from "qs";

let star = empty_star;

class CourseDescriptionPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      course_code: "",
      course_name: "",
      division: "",
      department: "",
      graph: "",
      course_description: "",
      syllabus: "",
      prerequisites: "",
      corequisites: "",
      exclusions: "",
      starred: false,
      graphics: [],
      username: localStorage.getItem('username'),
      in_list: false,
    }
  }



  componentDidMount() {
    console.log("pass in course code: ", this.props.match.params.code)

    axios.get(`http://127.0.0.1:5000/course/descriptions`, {
      params: {
        courses: [this.props.match.params.code],
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
      .then(res => {
        console.log(res.data)
        let json_dump = res.data["course_descriptions"]
        let json = JSON.parse(json_dump)
        let course_info = json[0]

        this.setState({ course_code: course_info["Course Code"] })
        this.setState({ course_name: course_info["Course Name"] })
        this.setState({ division: course_info["Division"] })
        this.setState({ department: course_info["Department"] })

        this.setState({ course_description: course_info["Details"] })

        let pre_str = course_info["Prerequisites"].slice(1, -1)
        let prereq = pre_str.split(", ")

        let total_prereq = ""
        for (let i = 0; i < prereq.length; i++) {
          prereq[i] = prereq[i].slice(1, -1);
          total_prereq += prereq[i]
          if (i < prereq.length - 1) {
            total_prereq += ", "
          }
        }

        this.setState({ prerequisites: total_prereq })

        let co_str = course_info["Corequisites"].slice(1, -1)
        let co_req = co_str.split(", ")

        let total_coreq = ""
        console.log("here", co_req)
        for (let i = 0; i < co_req.length; i++) {
          co_req[i] = co_req[i].slice(1, -1);
          total_coreq += co_req[i]
          if (i < co_req.length - 1) {
            total_coreq += ", "
          }
        }

        console.log(total_coreq)

        this.setState({ corequisites: total_coreq })

        let ex_str = course_info["Exclusion"].slice(1, -1)
        let ex_req = ex_str.split(", ")

        let total_exreq = "";
        for (let i = 0; i < ex_req.length; i++) {
          ex_req[i] = ex_req[i].slice(1, -1)
          total_exreq += ex_req[i]
          if (i < ex_req.length - 1) {
            total_exreq += ", "
          }
        }

        console.log("here", total_exreq)


        this.setState({ exclusions: total_exreq })

        let syllabus_link = "http://courses.skule.ca/course/" + this.props.code
        this.setState({ syllabus: syllabus_link })

        let temp_graph = []
        //temp_graph.push(<ShowGraph graph_src={this.state.graph}></ShowGraph>)
        this.setState({ graphics: temp_graph })

        let in_list = false;
        if (sessionStorage.getItem(this.state.course_code) != null) {
          in_list = true;
        }
        this.setState({ in_list: in_list })

      })


    console.log("new state: ", this.state)
  }


  openLink = () => {
    const newWindow = window.open(this.state.syllabus, '_blacnk', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  addToList = () => {
    sessionStorage.setItem(this.state.course_code, "");
    this.setState({ in_list: true })
  }

  removeFromList = () => {
    sessionStorage.removeItem(this.state.course_code);
    this.setState({ in_list: false })
  }

  render() {
    return (

      <div className="page-content">
        <Container className="course-template">
          <Row float="center" className="course-title">
            <Col xs={8}>
              <h1>{this.state.course_code} : {this.state.course_name}</h1>
            </Col>
            {/* <Col xs={4}>
              <img src={star} onClick={this.check_star} alt="" />
            </Col> */}
            <Col>
              {
                this.state.in_list ? (
                  <button className={"syllabus-link"} onClick={this.removeFromList}> Remove from List</button>
                ) : (
                  <button className={"syllabus-link"} onClick={this.addToList}> Add to List</button>
                )
              }
            </Col>
          </Row>
          <Row>
            <Col className="col-item">
              <h3>Division</h3>
              <p>{this.state.division}</p>
            </Col>
            <Col className="col-item">
              <h3>Department</h3>
              <p>{this.state.department}</p>
            </Col>
            <Col className="col-item">
              <h3>Past Tests and Syllabi</h3>
              <button className={"syllabus-link"} onClick={this.openLink}>View</button>
            </Col>
          </Row>
          <Row className="col-item course-description">
            <h3>Course Description</h3>
            <p>{this.state.course_description}</p>
          </Row>
          <Row className="col-item course-requisite">
            <Row>
              <h3>Course Requisites</h3>
            </Row>
            <Row>
              <Col className="requisites-display">
                <h4>Pre-Requisites</h4>
                <p>{this.state.prerequisites}</p>
              </Col>
              <Col className="requisites-display">
                <h4>Co-Requisites</h4>
                <p>{this.state.corequisites}</p>
              </Col>
              <Col className="requisites-display">
                <h4>Exclusion</h4>
                <p>{this.state.exclusions}</p>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    )
  }
}

export default CourseDescriptionPage
