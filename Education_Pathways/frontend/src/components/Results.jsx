import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/Result.css'

class Result extends Component{

  constructor(props) {
    super(props);
    this.state = {
      course_code : this.props.course_code,
      course_name: this.props.course_name,
      division: "Division of Computer Engineering",
      faculty: "Faculty of Applied Science and Engineering",
      starred: false,
      username: localStorage.getItem('username')
    };
  }

  redirectCourse = () => {
    this.props.history.push(`/course/details/${this.props.course_code}`, {course_code: this.props.course_code})
  }
  
  componentDidMount() {
    // axios.get(`https://assignment-1-starter-template.herokuapp.com/user/wishlist?username=${this.state.username}`)
    // .then(res => {
    //   let len = res.data.wishlist.course.length
    //   for (let i = 0; i < len; i++) {
    //     if (res.data.wishlist.course[i].code === this.state.course_code) {
    //       star = starred
    //       this.setState({starred: true})
    //     }
    //   }
    // })
  }





  render(){
    return (
      <Container>
        <a href={`courseDetails/${this.state.course_code}`} onClick={this.redirectCourse} className={"search-result-item"} style={{textDecoration: "none"}}>
        <Row className={"result-display"}>
            <Col>
                <h6>{this.state.course_code}</h6>  
            </Col>
            <Col>
                <p>{this.state.course_name}</p>
            </Col>
            {/* <Col><img src={star} alt=""/></Col> */}
        </Row>
        </a>
      </Container>
    );
  }
}

export default Result;
