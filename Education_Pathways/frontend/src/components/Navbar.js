import React, { Component } from 'react';
import './css/navbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import logo from './img/uoft_logo.png'
import { Navbar, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import LogIn from "./LogIn.jsx";
import CourseDescriptionPage from "./CourseDescription";
// import Wishlist from './Wishlist';
// import SignUp from './SignUp'
import SearchResultDisplay from './ResultDisplay'
import SearchList from './SearchDisplay'
import MyListPage from './MyListPage'
import ListPage from './ListPage'
import AdminPanel from './AdminPanelComp/AdminPanel';

// function CourseDescription(props) {
//   let query = useQuery();
//   return <CourseDescriptionPage code={query.get("code")} />;
// }

// function useQuery() {
//   const { search } = useLocation();

//   return React.useMemo(() => new URLSearchParams(search), [search]);
// }


export default class NavbarComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: localStorage.getItem('username'),
      login: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('username') !== "") {
      this.setState({ username: localStorage.getItem('username') })
    }
  }

  logOut = () => {
    localStorage.setItem('username', "");
    this.setState({ username: "" })
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar bg="002a5c" variant="dark" sticky="top" expand="lg">
            <Navbar.Brand>
              <img src={logo} alt="" />{" "}
              <Nav.Link href="/" style={{ color: "white", display: "inline" }}>
                Coursify
              </Nav.Link>
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>

                <Nav.Link as={Link} to="/mylist">
                  Course List
                </Nav.Link>

                {/* <Nav.Link href="/search" style={{ color: "white", display: "inline" }}>
                  Search
                </Nav.Link> */}

              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route path="/about">
              <div className="body_text" align="left">
                <p>

                  Welcome to IO's improvement of CARTE's in-development tool for course selection at UofT. Coursify is a modificaiton of CARTE's original Education Pathways platform that 
                  
                  allows for more intelligent course searching by matching not just the terms you search, but ones relevant to them. The more terms you search for, the more relevant your results will be! Even try searching across disciplines for the courses that best cover each.

                  Whatever year you are looking for, Education Pathways will also suggest courses in earlier years that will best help you to prepare. To get the most out of this, try searching for courses in a later year and see what is suggested for your current one.

                  We are looking for feedback to improve Education Pathways and make it more useful for students. 
                </p>
                <p>
                  <b>Development Team: </b>
                </p>
                <p>Alexander Olson <a href="https://carte.utoronto.ca/">(CARTE)</a> and student team from <a href="https://shuiblue.github.io/UofT-ECE444/">ECE444-Fall2022</a>: Americo B, Dennis L, Joseph S, Michael H and Sepehr T</p>


              </div>
              {/* <SearchResultDisplay /> */}
            </Route>
            <Route path="/search">
              <SearchResultDisplay />
            </Route>
            <Route path="/mylist">
              <MyListPage />
            </Route>
            <Route exact
              path="/courseDetails/:code"
              render={props => (<CourseDescriptionPage {...props} />)}>
            </Route>
            <Route exact
              path="/searchLists/:input"
              render={props => (<SearchList {...props} />)}>
            </Route>
            <Route exact
              path="/list/:uuid"
              render={props => (<ListPage {...props} />)}>
            </Route>
            <Route path="/adminPanel">
              <AdminPanel />
            </Route>
            <Route path="/">
              <SearchResultDisplay />
            </Route>

          </Switch>
        </div>



      </Router>
    );
  }
}
