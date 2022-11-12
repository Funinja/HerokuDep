import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import axios from "axios"
import qs from "qs"


class MyListPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      list_link: "",
    }
  }

  componentDidMount() {
    for (let i = 0; i < sessionStorage.length; i++) {
      let course_code = sessionStorage.key(i);
      this.state.courses.push(course_code);
      this.setState({ courses: this.state.courses })
    }

    axios.get(`http://127.0.0.1:5000/course/descriptions`, {
      params: {
        courses: this.state.courses,
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }).then(res => {
      let json = JSON.parse(res.data["course_descriptions"])
      this.setState({ courses: json })
    })

  }

  publishList = () => {
    axios.post(`http://127.0.0.1:5000/api/list`, {
      courses: this.state.courses
    }).then((response) => {
      console.log(response);
      this.setState({ list_link: response.data.list_uuid })
    })
  }

  render() {
    return (
      <div>
        <Container className="page-content">
          <Row>
            <Col>
              <h1>Course List</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Nav>
                {
                  this.state.courses.map((course) =>
                    <Nav.Link key={course["Course Code"]} as={Link} to={`/courseDetails/${course["Course Code"]}`}>
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>
                            {course["Course Code"]}
                          </Card.Title>
                          <Card.Text>
                            {course["Course Name"]}
                            <br></br>
                            <br></br>
                            {course["Division"]}
                            <br></br>
                            <br></br>
                            {course["Department"]}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Nav.Link>
                  )
                }
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col>
              <button className={"syllabus-link"} onClick={this.publishList}>Publish</button>
            </Col>
          </Row>
          <Row>
            <Col>
              {
                this.state.list_link != "" &&
                <Link target="_blank" to={`/list/${this.state.list_link}`}><p>{"localhost:5000/list/" + this.state.list_link}</p></Link>
              }
            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

export default withRouter(MyListPage)