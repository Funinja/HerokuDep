import axios from 'axios'
import qs from "qs";
import React, { Component } from 'react'

export class Syllabi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_code: props.course_code,
      syllabus_link: undefined,
      request_count: 0,
      requested: false
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/course/syllabus`, {
      params:{
        course: [this.props.course_code],
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
    .then(res => {
      console.log(res.data)
      if(res.data["link"]){
        this.setState({syllabus_link: res.data["link"]});
      }else if(res.data["request_count"]){
        this.setState({request_count: res.data["request_count"]});
      }
    })
  }
  openLink() {
    
  }
  render() {
    if(this.state.syllabus_link){
      return (
        <button className={"syllabus-link"} onClick={this.openLink}>View</button>
      )
    }else {
      return (
        <div className='syllabus-request'>
            <button className={"syllabus-link"} onClick={this.openLink}>Request</button>
            <span className={"request-counter"} title="Number of requests made for this course">
              {this.state.requestCount}
            </span>
          </div>
      )
    }
  }
}

export default Syllabi