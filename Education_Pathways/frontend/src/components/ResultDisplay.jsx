import React, { Component } from "react";
import axios from 'axios'
import Result from './Results'
import './css/Result.css'
import './css/dropdown.css'
import Label from './Label'
import "./css/styles.css";
import qs from "qs";
import {depOptions} from './DepOptions';
import {filtOptions} from './FiltOptions';
import { withRouter } from "react-router-dom";
import Select from 'react-select';

import { components } from "react-select";

Option = (props) => {
    return (
        <div>
            <components.Option{...props}>
                <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null} /> {" "}
                <label> {props.label} </label>
            </components.Option>
        </div>
    )
};

class SearchResultDisplay extends Component{

  constructor() {
    super();
    this.state = {
      input: "",
      results: [],
      error: 0,
      filterLevel: null,
      filterDepartment: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleCourseRoute(event, course_code){
    console.log(course_code)
    this.props.history.push(`/course/details/${this.props.course_code}`, {course_code: course_code})
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({input: event.target.value});
    let dep_filt_val = [];
    console.log("handling change")

    if (this.state.filterDepartment){

      for (let i = 0; i < this.state.filterDepartment.length; i++) {
        dep_filt_val.push(this.state.filterDepartment[i]['value'])
      }

    }
    let lev_filt_val = [];

    if(this.state.filterLevel){
      
      for (let i = 0; i < this.state.filterLevel.length; i++) {
        lev_filt_val.push(this.state.filterLevel[i]['value'])
      }
    }

    console.log(dep_filt_val)

    if(event.target.value.length > 1){
      this.getData(event.target.value, dep_filt_val, lev_filt_val);
    }
  }

  handleChangeLevel(selected) {

    this.setState({
      filterLevel: selected,
      results: [],
      error : 0
    });
    console.log(selected)

  }

  handleDepChange = (selected) => {
    this.setState({
      filterDepartment: selected,
      results: [],
      error : 0
    });
    console.log(selected)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.input.length > 1){
      this.props.history.push({
        pathname: `/searchLists/${this.state.input}`,
        state: { 
          filterDepartment : this.state.filterDepartment,
          filterLevel: this.state.filterLevel
        }
      });
    }
  }

  clickEvent = (event) =>{
    event.stopPropagation();
    this.setState({results: [], error : 0})
  }

  getData = (input, filterDepartment, filterLevel) => {
    axios.get(`http://127.0.0.1:5000/searchc`,{
      params: {
        input: input,
        numResults: 5,
        filterDepartment : filterDepartment,
        filterLevel:filterLevel
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
      .then(res => {
        console.log(`it is ${res.status}`)
        console.log(this.state.filterDepartment)
        if (res.status === 200) {
          this.setState({results: []})

          console.log(res.data["courses"])
          let course_prob = res.data["courses"]
          let course_names = res.data["names"]
          let courses = []

          
          for(let i = 0; i < course_prob.length ; i++){
            courses.push(course_prob[i])
          }
          
          console.log("Here")
          console.log(courses.length)

          if (courses.length >= 0) {
            let len = courses.length
            let result_temp = []
            
            for (let i = 0; i < len; i++) {
                if(input === courses[i].slice(0, input.length)){
                  result_temp.push(
                    <Result course_code={courses[i]} course_name={course_names[i]}></Result>
                  )
                }
            }
            if(result_temp.length === 0){
              this.setState({result : [], error : 1})
            }else{
              this.setState({results: result_temp, error : 0})
            }
          } else if (res.data.length === 0) {
            alert("Course not found")
          }else {
            let result_temp = []
            this.setState({results: result_temp, error : 1})
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
      <div className="SearchQuery" onClick={this.clickEvent}>
        <div style={{ marginTop: "10%" }}>
            <h1> Education Pathways</h1>
            <br></br>
            {/* <div className = "body_text">
      Welcome to CARTE's in-development tool for course selection at UofT. Education Pathways allows for more intelligent course searching, by matching not just the terms you search, but ones relevant to them. The more terms you search for, the more relevant your results will be! Even try searching across disciplines for the courses that best cover each.

Whatever year you are looking for, Education Pathways will also suggest courses in earlier years that will best help you to prepare. To get the most out of this, try searching for courses in a later year and see what is suggested for your current one.

We are looking for feedback to improve Education Pathways and make it more useful for students. If you have ideas or suggestions, please <a href = "mailto:alex.olson@utoronto.ca">  email us! </a>


      </div> */}
            <form onSubmit={this.handleSubmit} className={"search"}>
                <input placeholder={"Search for course code, course name, keyword ..."} className={"text-input"} type="text" value={this.state.input} onChange={this.handleChange} />
                <input type="submit" value="Search" className={"submit-button"}/>
                <ul id="course_list" className="dropdown_search_opt">
                  <div className={"search-result-display"} >
                  {this.state.error === 1 ? 
                        <h1>No such courses exist</h1>
                        :
                        this.state.results}
                  </div>
                </ul>
                <div className="dropdown_dep">
                  <Select 
                    options={depOptions}
                    onChange={this.handleDepChange}
                    isMulti
                    placeholder="Department"
                    
                  />
                  
                </div>
                <div className="dropdown_level">
                  <Select 
                    options={filtOptions}
                    onChange={this.handleChangeLevel}
                    isMulti
                    placeholder="Level"
                    
                  />
                  
                </div>

            </form>
        </div>

       
      </div>
    );
  }


  
}

export default withRouter(SearchResultDisplay);
