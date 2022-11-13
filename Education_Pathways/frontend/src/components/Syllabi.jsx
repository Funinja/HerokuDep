import axios from 'axios'
import qs from "qs";
import React, { Component } from 'react'

export class Syllabi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: props.course_code,
      syllabus_link: "",
      request_count: 0,
      requested: false
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/course/syllabus`, {
      params:{
        course_code: this.state.course_code
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
    .then(res => {
      let course_syllabus_info = JSON.parse(res.data)[0]
      if(course_syllabus_info.link){
        this.setState({syllabus_link: course_syllabus_info.link});
      }else if(course_syllabus_info.request_count){
        this.setState({request_count: course_syllabus_info.request_count});
      }
    })
  }
  openLink() {
    const newWindow = window.open(this.state.syllabus_link, '_blacnk', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  }
  requestSyllabus = () => {
    axios
      .post(`http://127.0.0.1:5000/course/syllabus`, {course_code: this.state.course_code,})
      .then((res) => {
        let newRequestCount = JSON.parse(res.data).request_count;
        //Redo the getting or increase the count on the front end
        this.setState({
          request_count: newRequestCount
            ? newRequestCount
            : this.state.request_count + 1,
          requested: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if(this.state.syllabus_link){
      return (
        <button className={"syllabus-link"} onClick={this.openLink}>View</button>
      )
    }else if (this.state.requested){
      return (
        <div className='syllabus-request'>
          <button className={"syllabus-link"}>Already Requested</button>
          <span className={"request-counter"} title="Number of requests made for this course">
            {this.state.request_count}
          </span>
        </div>
      )
    }else {
      return (
        <div className='syllabus-request'>
          <button className={"syllabus-link"} onClick={this.requestSyllabus}>Request</button>
          <span className={"request-counter"} title="Number of requests made for this course">
            {this.state.request_count}
          </span>
        </div>
      )
    }
  }
}

export default Syllabi