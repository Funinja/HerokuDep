import React, { Component } from "react";
import axios from 'axios'
import Result from './Results'
import './css/Result.css'
import Label from './Label'
import "./css/styles.css";
import qs from "qs";
import { withRouter } from "react-router-dom";


class SearchDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      input: props.match.params.input,
      course_codes: [],
      course_names: [],
      results: [],
      error: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCodes(this.state.input);
  }

  redirectCourse = (course) => {
    this.props.history.push(`/course/details/${course}`, {course_code: course})
  }

  handleChange(event) {
    this.setState({input: event.target.value});
    this.getData(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getData(this.state.input)
  }

  getDescriptions = (courses) =>{
    axios.get(`http://127.0.0.1:5000/course/descriptions`, {
      params: {
        courses: courses
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
      .then(res => {
        console.log(`it is ${res.status}`)
        let json_dump = res.data["course_descriptions"]
        let json = JSON.parse(json_dump)
        let result_list = []

        // console.log(json)
        for(let i = 0; i < json.length ; i++){
          // console.log(json_dump[0]["Course Code"])
          let result_temp = []
          result_temp.push(<p>Course Code: {json[i]["Course Code"]}</p>)
          result_temp.push(<p>Course Name: {json[i]["Course Name"]}</p>)
          result_temp.push(<p>Credit Value: {json[i]["Credit Value"]}</p>)
          result_temp.push(<p>Details: {json[i]["Details"]}</p>)
          result_temp.push(<p>Prerequisites: {json[i]["Prerequisites"]}</p>)
          result_temp.push(<p>Recommended Preparation: {json[i]["Recommended Preparation"]}</p>)
          result_list.push(<a href={`../courseDetails/${json[i]["Course Code"]}`} style={{textDecoration: "none"}}>
            {result_temp}
          </a>)
        }

        this.setState({results: result_list})
      }).catch(

        error => {
          console.log(error)
          this.setState({error : 1})
        }
      )
  }


  getCodes = async (input) => {
    axios.get(`http://127.0.0.1:5000/searchc?input=${input}&numResults=5`)
      .then(res => {
        if (res.status === 200) {
          this.setState({results: []})

          let course_prob = res.data["courses"]
          let course_names = res.data["names"]
          let courses = []
          for(let i = 0; i < course_prob.length ; i++){
            if(input === course_prob[i][0].slice(0, input.length)){
              courses.push(course_prob[i][0])
            }
          }

          this.getDescriptions(courses)

          if (courses.length > 0) {
            this.setState({course_codes : courses, course_names : course_names})
          } else if (res.data.length === 0) {
            alert("Course not found")
          }else {
            this.setState({error : 1})
          }

        } else if (res.status === 400) {
          alert("System Error. Please refresh")
        } 
    }).catch(

      error => {
        console.log(error)
        this.setState({error : 1})
      }

    )
  }

  render(){
    return (
      <div className="SearchQuery">
        <h1>Results</h1>
        <div className={"search-result-display"} >
          {this.state.results}
        </div>
      </div>
    );
  }


  
}

export default withRouter(SearchDisplay);