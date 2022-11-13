import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"
import qs from "qs";



class ListPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/api/list`, {
      params: {
        list_uuid: this.props.match.params.uuid,
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }
    ).then((response) => {
      this.setState({ courses: response.data["course_list"] })
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
    })
  }

  render() {
    return (<Container>
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
    </Container>)
  }
}

export default withRouter(ListPage)