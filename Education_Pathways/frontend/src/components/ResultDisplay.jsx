import React, { Component } from "react";
import axios from 'axios'
import Result from './Results'
import './css/Result.css'
import Label from './Label'
import "./css/styles.css";


class SearchResultDisplay extends Component{

  constructor() {
    super();
    this.state = {
      input: "",
      results: [],
      error: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
    this.getData(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getData(this.state.input)
  }

  getData = (input) => {
    axios.get(`https://floating-cliffs-54153.herokuapp.com/searchc?input=${input}`)
      .then(res => {
        console.log(`it is ${res.status}`)
        if (res.status === 200) {
          this.setState({results: []})
          
          if (res.data.length > 0) {
            let len = res.data.length
            let result_temp = []
            result_temp.push(<Label></Label>)
            for (let i = 0; i < len; i++) {
                console.log(res.data[i])
                if(input === res.data[i][0].slice(0, input.length)){
                  result_temp.push(<Result course_code={res.data[i][0].slice(0, 8)} course_name={res.data[i][0].slice(9)}></Result>)
                }
            }
            if(result_temp.length === 1){
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

  // search_render = (input) => {

  //   <div className="SearchQuery">
  //       <div style={{ marginTop: "10%" }}>
  //           <h1> Education Pathways Search</h1>
  //           <br></br>
  //           <form onSubmit={this.handleSubmit} className={"search"}>
  //               <input placeholder={"Search for course code, course name, keyword ..."} className={"text-input"} type="text" value={this.state.input} onChange={this.handleChange} />
  //               <input type="submit" value="Submit" className={"submit-button"}/>
  //           </form>
  //       </div>

  //       <div className={"search-result-display"} >
  //           {this.state.results}
  //       </div>

       
  //     </div>





  // }

  render(){
    return (
      <div className="SearchQuery">
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
            </form>
        </div>

        <div className={"search-result-display"} >
            {this.state.error == 1 ? 
              <h1>No such courses exist</h1>
              :
              this.state.results}
        </div>

       
      </div>
    );
  }


  
}

export default SearchResultDisplay;
