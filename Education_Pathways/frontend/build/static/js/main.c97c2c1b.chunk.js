(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{103:function(e,t,s){e.exports={"review-card":"ReviewCard_review-card__1ZP7x"}},104:function(e,t,s){e.exports={"reviews-list":"ReviewsList_reviews-list__1OO7-"}},105:function(e,t,s){e.exports={"reviews-comp":"ReviewsComp_reviews-comp__w6gRv"}},113:function(e,t,s){},114:function(e,t,s){},115:function(e,t,s){},143:function(e,t){},148:function(e,t,s){},179:function(e,t,s){},180:function(e,t,s){},182:function(e,t,s){"use strict";s.r(t);var a=s(0),n=s(32),i=s.n(n),r=(s(113),s(2)),l=s(18),c=s(19),o=s(22),u=s(21),h=(s(114),s(85),s.p+"static/media/uoft_logo.89510530.png"),d=s(184),b=s(185),j=s(31),p=s(17),m=(s(115),s(39)),v=s(15),f=s(20),g=s(14),O=s.n(g),y=s(25),x=s.n(y),S=s(1),C=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).openLink=function(){var e=window.open(a.state.syllabus_link,"_blank","noopener,noreferrer");e&&(e.opener=null)},a.requestSyllabus=function(){O.a.post("https://coursify-ece444.herokuapp.com/course/syllabus",{course_code:a.state.course_code}).then((function(e){var t=JSON.parse(e.data).request_count;a.setState({request_count:t||a.state.request_count+1,requested:!0})})).catch((function(e){console.log(e)}))},a.state={course_code:e.course_code,syllabus_link:"",request_count:0,requested:!1},a}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=this;O.a.get("https://coursify-ece444.herokuapp.com/course/syllabus",{params:{course_code:this.state.course_code},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){var s=JSON.parse(t.data)[0];s.link?e.setState({syllabus_link:s.link}):s.request_count&&e.setState({request_count:s.request_count})}))}},{key:"render",value:function(){return this.state.syllabus_link?Object(S.jsx)("button",{className:"syllabus-link",onClick:this.openLink,children:"View"}):this.state.requested?Object(S.jsxs)("div",{className:"syllabus-request",children:[Object(S.jsx)("button",{className:"syllabus-link",disabled:!0,children:"Requested"}),Object(S.jsx)("span",{className:"request-counter",title:"Number of requests made for this course",children:this.state.request_count})]}):Object(S.jsxs)("div",{className:"syllabus-request",children:[Object(S.jsx)("button",{className:"syllabus-link",onClick:this.requestSyllabus,children:"Request"}),Object(S.jsx)("span",{className:"request-counter",title:"Number of requests made for this course",children:this.state.request_count})]})}}]),s}(a.Component),_=s(12),k=s(11),N=s(102),w=s(43),D=s(73),E=s.n(D),L=Object(a.createContext)(),T=function(e){var t=e.color,s=e.onMouseEnter,a=e.onMouseLeave;return Object(S.jsx)("div",{onMouseEnter:s,onMouseLeave:a,style:{cursor:"pointer",display:"inline-block"},children:Object(S.jsx)("svg",{stroke:t,fill:t,strokeWidth:"0",viewBox:"0 0 1024 1024",color:"#ffc107",height:"20",width:"20",xmlns:"http://www.w3.org/2000/svg",children:Object(S.jsx)("path",{d:"M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"})})})},P=function(e){var t=Object(a.useState)(""),s=Object(_.a)(t,2),n=s[0],i=s[1],r=Object(a.useState)(""),l=Object(_.a)(r,2),c=l[0],o=l[1],u=Object(a.useState)(""),h=Object(_.a)(u,2),d=h[0],b=h[1],j=Object(a.useState)(0),p=Object(_.a)(j,2),m=p[0],g=p[1],y=Object(a.useState)(null),C=Object(_.a)(y,2),D=C[0],P=C[1],A=Object(a.useContext)(L),M=(A.reviews,A.setReviews),U=function(){O.a.get("https://coursify-ece444.herokuapp.com/course/reviews",{params:{courseCode:e.course_code},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(e){var t=JSON.parse(e.data.reviews);console.log(t),M(t)}))};return Object(S.jsxs)(w.a,{className:E.a["reviews-form"],onSubmit:function(t){var s,a,r,l;t.preventDefault(),i(""),o(""),b(""),g(0),s=n,a=c,r=d,l=m,O.a.get("https://coursify-ece444.herokuapp.com/course/addreview",{params:{courseCode:e.course_code,firstName:s,lastName:a,review:r,stars:l}}).then((function(){U()}))},children:[Object(S.jsxs)(f.a,{className:"mb-3",children:[Object(S.jsxs)(w.a.Group,{as:v.a,controlId:"formFirstName",children:[Object(S.jsx)(w.a.Label,{children:"First name:"}),Object(S.jsx)(w.a.Control,{type:"text",value:n,onChange:function(e){i(e.target.value)},placeholder:"Enter first name"})]}),Object(S.jsxs)(w.a.Group,{as:v.a,controlId:"formLastName",children:[Object(S.jsx)(w.a.Label,{children:"Last name:"}),Object(S.jsx)(w.a.Control,{type:"text",value:c,onChange:function(e){o(e.target.value)},placeholder:"Enter last name"})]})]}),Object(S.jsx)(w.a.Group,{className:"mb-3",controlId:"formReview",children:Object(S.jsx)(w.a.Control,{as:"textarea",rows:3,value:d,onChange:function(e){b(e.target.value)},placeholder:"Enter review here"})}),Object(S.jsx)("div",{className:E.a["star-rating"],children:Object(k.a)(Array(5)).map((function(e,t){var s=t+1;return Object(S.jsxs)("label",{children:[Object(S.jsx)("input",{className:E.a["star-input"],type:"radio",name:"rating",value:s,onClick:function(){return g(s)}}),Object(S.jsx)(T,{color:s<=(D||m)?"#ffc107":"#e4e5e9",onMouseEnter:function(){return P(s)},onMouseLeave:function(){return P(null)}})]})}))}),Object(S.jsx)(N.a,{variant:"primary",type:"submit",children:"Submit"})]})},A=s(103),M=s.n(A),U=function(e){var t=e.firstName,s=e.lastName,a=e.review,n=e.rating;return Object(S.jsxs)("div",{className:M.a["review-card"],children:[Object(S.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"15px"},children:[Object(S.jsx)("div",{children:Object(S.jsxs)("p",{style:{margin:0,display:"inline",color:"#1C3E6E"},children:[t," ",s[0],"."]})}),Object(S.jsx)("div",{children:Object(k.a)(Array(5)).map((function(e,t){var s=t+1;return console.log(n),Object(S.jsx)(T,{color:s<=n?"#ffc107":"#e4e5e9"})}))})]}),Object(S.jsx)("p",{style:{margin:0},children:a})]})},I=s(104),R=s.n(I),q=function(e){e.reviewsData;var t=Object(a.useContext)(L).reviews;return Object(S.jsx)("ul",{className:R.a["reviews-list"],children:t.reverse().map((function(e){return Object(S.jsx)("li",{children:Object(S.jsx)(U,{firstName:e.first,lastName:e.last,review:e.review,rating:e.rating})})}))})},F=s(105),B=s.n(F),H=function(e){var t=Object(a.useState)(0),s=Object(_.a)(t,2),n=s[0],i=s[1];return Object(a.useEffect)((function(){for(var t=0,s=0;s<e.reviews.length;s++)t+=parseInt(e.reviews[s].rating);i(t)}),[i,e.reviews]),Object(S.jsxs)("div",{className:B.a["reviews-comp"],children:[Object(S.jsxs)("h3",{style:{marginBottom:"30px",marginLeft:0},children:[" Average Review: ",(n/e.reviews.length).toFixed(2)," ",Object(S.jsxs)("h5",{children:["(",e.reviews.length," Reviews)"]})," "]}),Object(S.jsx)(P,{course_code:e.course_code}),Object(S.jsx)(q,{reviewsData:e.reviews})]})},G=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).openLink=function(){var e=window.open(a.state.syllabus,"_blacnk","noopener,noreferrer");e&&(e.opener=null)},a.addToList=function(){sessionStorage.setItem(a.state.course_code,""),a.setState({in_list:!0})},a.removeFromList=function(){sessionStorage.removeItem(a.state.course_code),a.setState({in_list:!1})},a.state={course_code:a.props.match.params.code,course_name:"",division:"",department:"",graph:"",course_description:"",syllabus:"",prerequisites:"",corequisites:"",exclusions:"",starred:!1,graphics:[],reviews:[],username:localStorage.getItem("username"),in_list:!1},a}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=this;console.log("pass in course code: ",this.props.match.params.code),O.a.get("https://coursify-ece444.herokuapp.com/course/descriptions",{params:{courses:[this.props.match.params.code]},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){console.log(t.data);var s=t.data.course_descriptions,a=JSON.parse(s)[0];e.setState({course_code:a["Course Code"]}),e.setState({course_name:a["Course Name"]}),e.setState({division:a.Division}),e.setState({department:a.Department}),e.setState({course_description:a.Details});for(var n=a.Prerequisites.slice(1,-1).split(", "),i="",r=0;r<n.length;r++)n[r]=n[r].slice(1,-1),i+=n[r],r<n.length-1&&(i+=", ");e.setState({prerequisites:i});var l=a.Corequisites.slice(1,-1).split(", "),c="";console.log("here",l);for(var o=0;o<l.length;o++)l[o]=l[o].slice(1,-1),c+=l[o],o<l.length-1&&(c+=", ");console.log(c),e.setState({corequisites:c});for(var u=a.Exclusion.slice(1,-1).split(", "),h="",d=0;d<u.length;d++)u[d]=u[d].slice(1,-1),h+=u[d],d<u.length-1&&(h+=", ");console.log("here",h),e.setState({exclusions:h});e.setState({graphics:[]});var b=!1;null!=sessionStorage.getItem(e.state.course_code)&&(b=!0),e.setState({in_list:b})})),O.a.get("https://coursify-ece444.herokuapp.com/course/reviews",{params:{courseCode:this.props.match.params.code},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){var s=JSON.parse(t.data.reviews);e.setState({reviews:s})})),console.log("new state: ",this.state)}},{key:"render",value:function(){var e=this;return Object(S.jsx)("div",{className:"page-content",children:Object(S.jsxs)(m.a,{className:"course-template",children:[Object(S.jsxs)(f.a,{float:"center",className:"course-title",children:[Object(S.jsx)(v.a,{xs:8,children:Object(S.jsxs)("h1",{children:[this.state.course_code," : ",this.state.course_name]})}),Object(S.jsx)(v.a,{children:this.state.in_list?Object(S.jsx)("button",{className:"syllabus-link",onClick:this.removeFromList,children:" Remove from List"}):Object(S.jsx)("button",{className:"syllabus-link",onClick:this.addToList,children:" Add to List"})})]}),Object(S.jsxs)(f.a,{children:[Object(S.jsxs)(v.a,{className:"col-item",children:[Object(S.jsx)("h3",{children:"Division"}),Object(S.jsx)("p",{children:this.state.division})]}),Object(S.jsxs)(v.a,{className:"col-item",children:[Object(S.jsx)("h3",{children:"Department"}),Object(S.jsx)("p",{children:this.state.department})]}),Object(S.jsxs)(v.a,{className:"col-item",children:[Object(S.jsx)("h3",{children:"Course Syllabus"}),Object(S.jsx)(C,{course_code:this.state.course_code})]})]}),Object(S.jsxs)(f.a,{className:"col-item course-description",children:[Object(S.jsx)("h3",{children:"Course Description"}),Object(S.jsx)("p",{children:this.state.course_description})]}),Object(S.jsxs)(f.a,{className:"col-item course-requisite",children:[Object(S.jsx)(f.a,{children:Object(S.jsx)("h3",{children:"Course Requisites"})}),Object(S.jsxs)(f.a,{children:[Object(S.jsxs)(v.a,{className:"requisites-display",children:[Object(S.jsx)("h4",{children:"Pre-Requisites"}),Object(S.jsx)("p",{children:this.state.prerequisites})]}),Object(S.jsxs)(v.a,{className:"requisites-display",children:[Object(S.jsx)("h4",{children:"Co-Requisites"}),Object(S.jsx)("p",{children:this.state.corequisites})]}),Object(S.jsxs)(v.a,{className:"requisites-display",children:[Object(S.jsx)("h4",{children:"Exclusion"}),Object(S.jsx)("p",{children:this.state.exclusions})]})]})]}),Object(S.jsxs)(f.a,{className:"col-item",style:{padding:"20px"},children:[Object(S.jsx)("h3",{style:{marginBottom:"30px",marginLeft:0},children:"Course Reviews"}),Object(S.jsx)(L.Provider,{value:{reviews:this.state.reviews,setReviews:function(t){e.setState({reviews:t})}},children:Object(S.jsx)(H,{course_code:this.state.course_code,reviews:this.state.reviews})})]})]})})}}]),s}(a.Component),J=s(44),z=(s(79),function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).redirectCourse=function(){a.props.history.push("/course/details/".concat(a.props.course_code),{course_code:a.props.course_code})},a.state={course_code:a.props.course_code,course_name:a.props.course_name,division:"Division of Computer Engineering",faculty:"Faculty of Applied Science and Engineering",starred:!1,username:localStorage.getItem("username")},a}return Object(c.a)(s,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(S.jsx)(m.a,{children:Object(S.jsx)("a",{href:"courseDetails/".concat(this.state.course_code),onClick:this.redirectCourse,className:"search-result-item",style:{textDecoration:"none"},children:Object(S.jsxs)(f.a,{className:"result-display",children:[Object(S.jsx)(v.a,{children:Object(S.jsx)("h6",{children:this.state.course_code})}),Object(S.jsx)(v.a,{children:Object(S.jsx)("p",{children:this.state.course_name})})]})})})}}]),s}(a.Component)),W=(s(148),s(96),[{value:"ASDN: Arts and Science, Office of the Dean",label:"ASDN: Arts and Science, Office of the Dean"},{value:"Anatomy and Cell Biology",label:"Anatomy and Cell Biology"},{value:"Anthropology",label:"Anthropology"},{value:"Anthropology (UTSC)",label:"Anthropology (UTSC)"},{value:"Art History",label:"Art History"},{value:"Astronomy and Astrophysics",label:"Astronomy and Astrophysics"},{value:"Biochemistry",label:"Biochemistry"},{value:"Biological Sciences (UTSC)",label:"Biological Sciences (UTSC)"},{value:"Biology",label:"Biology"},{value:"Canadian Institute for Theoretical Astrophysics",label:"Canadian Institute for Theoretical Astrophysics"},{value:"Cell and Systems Biology",label:"Cell and Systems Biology"},{value:"Centre for Criminology and Sociolegal Studies",label:"Centre for Criminology and Sociolegal Studies"},{value:"Centre for Critical Development Studies (UTSC)",label:"Centre for Critical Development Studies (UTSC)"},{value:"Centre for Diaspora & Transnational Studies",label:"Centre for Diaspora & Transnational Studies"},{value:"Centre for Drama, Theatre and Performance Studies",label:"Centre for Drama, Theatre and Performance Studies"},{value:"Centre for European, Russian and Eurasian Studies",label:"Centre for European, Russian and Eurasian Studies"},{value:"Centre for Industrial Relations and Human Resources",label:"Centre for Industrial Relations and Human Resources"},{value:"Centre for Study of United States",label:"Centre for Study of United States"},{value:"Centre for Teaching and Learning (UTSC)",label:"Centre for Teaching and Learning (UTSC)"},{value:"Chemical Engineering and Applied Chemistry",label:"Chemical Engineering and Applied Chemistry"},{value:"Chemical and Physical Sciences",label:"Chemical and Physical Sciences"},{value:"Chemistry",label:"Chemistry"},{value:"Cinema Studies Institute",label:"Cinema Studies Institute"},{value:"Civil and Mineral Engineering",label:"Civil and Mineral Engineering"},{value:"Classics",label:"Classics"},{value:"Computer Science",label:"Computer Science"},{value:"Cross Disciplinary Programs Office",label:"Cross Disciplinary Programs Office"},{value:"Department for the Study of Religion",label:"Department for the Study of Religion"},{value:"Dept. of Arts, Culture & Media (UTSC)",label:"Dept. of Arts, Culture & Media (UTSC)"},{value:"Dept. of Computer & Mathematical Sci (UTSC)",label:"Dept. of Computer & Mathematical Sci (UTSC)"},{value:"Dept. of Historical & Cultural Studies (UTSC)",label:"Dept. of Historical & Cultural Studies (UTSC)"},{value:"Dept. of Physical & Environmental Sci (UTSC)",label:"Dept. of Physical & Environmental Sci (UTSC)"},{value:"Division of Engineering Science",label:"Division of Engineering Science"},{value:"Earth Sciences",label:"Earth Sciences"},{value:"East Asian Studies",label:"East Asian Studies"},{value:"Ecology and Evolutionary Biology",label:"Ecology and Evolutionary Biology"},{value:"Economics",label:"Economics"},{value:"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",label:"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin."},{value:"Engineering First Year Office",label:"Engineering First Year Office"},{value:"English",label:"English"},{value:"English (UTSC)",label:"English (UTSC)"},{value:"English and Drama",label:"English and Drama"},{value:"Factor Inwentash Faculty of Social Work",label:"Factor Inwentash Faculty of Social Work"},{value:"Faculty of Applied Science & Engineering",label:"Faculty of Applied Science & Engineering"},{value:"Faculty of Arts and Science",label:"Faculty of Arts and Science"},{value:"Faculty of Music",label:"Faculty of Music"},{value:"French",label:"French"},{value:"Geography and Planning",label:"Geography and Planning"},{value:"Geography, Geomatics and Environment",label:"Geography, Geomatics and Environment"},{value:"Germanic Languages & Literatures",label:"Germanic Languages & Literatures"},{value:"Health and Society (UTSC)",label:"Health and Society (UTSC)"},{value:"Historical Studies",label:"Historical Studies"},{value:"History",label:"History"},{value:"Human Biology Program",label:"Human Biology Program"},{value:"Human Geography (UTSC)",label:"Human Geography (UTSC)"},{value:"Immunology",label:"Immunology"},{value:"Indigenous Studies Arts & Science",label:"Indigenous Studies Arts & Science"},{value:"Inst for Studies in Transdisciplinary Engin Educ & Practice",label:"Inst for Studies in Transdisciplinary Engin Educ & Practice"},{value:"Inst. for the History & Philosophy of Science & Technology",label:"Inst. for the History & Philosophy of Science & Technology"},{value:"Institute for Management and Innovation",label:"Institute for Management and Innovation"},{value:"Institute for the Study of University Pedagogy",label:"Institute for the Study of University Pedagogy"},{value:"Institute of Biomedical Engineering",label:"Institute of Biomedical Engineering"},{value:"Institute of Communication and Culture",label:"Institute of Communication and Culture"},{value:"Italian Studies",label:"Italian Studies"},{value:"Jewish Studies",label:"Jewish Studies"},{value:"John H. Daniels Faculty of Architecture, Landscape, & Design",label:"John H. Daniels Faculty of Architecture, Landscape, & Design"},{value:"Laboratory Medicine and Pathobiology",label:"Laboratory Medicine and Pathobiology"},{value:"Language Studies",label:"Language Studies"},{value:"Language Studies (UTSC)",label:"Language Studies (UTSC)"},{value:"Linguistics",label:"Linguistics"},{value:"Management",label:"Management"},{value:"Management (UTSC)",label:"Management (UTSC)"},{value:"Materials Science and Engineering",label:"Materials Science and Engineering"},{value:"Mathematical and Computational Sciences",label:"Mathematical and Computational Sciences"},{value:"Mathematics",label:"Mathematics"},{value:"Mechanical & Industrial Engineering",label:"Mechanical & Industrial Engineering"},{value:"Molecular Genetics",label:"Molecular Genetics"},{value:"Munk School of Global Affairs and Public Policy",label:"Munk School of Global Affairs and Public Policy"},{value:"Near & Middle Eastern Civilizations",label:"Near & Middle Eastern Civilizations"},{value:"New College",label:"New College"},{value:"Nutritional Sciences",label:"Nutritional Sciences"},{value:"Pharmacology",label:"Pharmacology"},{value:"Philosophy",label:"Philosophy"},{value:"Philosophy (UTSC)",label:"Philosophy (UTSC)"},{value:"Physics",label:"Physics"},{value:"Physiology",label:"Physiology"},{value:"Political Science",label:"Political Science"},{value:"Political Science (UTSC)",label:"Political Science (UTSC)"},{value:"Psychology",label:"Psychology"},{value:"Psychology (UTSC)",label:"Psychology (UTSC)"},{value:"Rotman Commerce",label:"Rotman Commerce"},{value:"School of Environment",label:"School of Environment"},{value:"Sexual Diversity Studies",label:"Sexual Diversity Studies"},{value:"Slavic Languages and Literatures",label:"Slavic Languages and Literatures"},{value:"Sociology",label:"Sociology"},{value:"Sociology (UTSC)",label:"Sociology (UTSC)"},{value:"Spanish and Portuguese",label:"Spanish and Portuguese"},{value:"St. Michael's College",label:"St. Michael's College"},{value:"Statistical Sciences",label:"Statistical Sciences"},{value:"Trinity College",label:"Trinity College"},{value:"University College",label:"University College"},{value:"University of Toronto Mississauga",label:"University of Toronto Mississauga"},{value:"University of Toronto Scarborough",label:"University of Toronto Scarborough"},{value:"Victoria College",label:"Victoria College"},{value:"Visual Studies",label:"Visual Studies"},{value:"Women and Gender Studies Institute",label:"Women and Gender Studies Institute"}]),V=[{value:"1",label:"100"},{value:"2",label:"200"},{value:"3",label:"300"},{value:"4",label:"400"},{value:"5",label:"500"},{value:"6",label:"600"},{value:"7",label:"700"}],Q=s(71),Y=s(8);Option=function(e){return Object(S.jsx)("div",{children:Object(S.jsxs)(Y.o.Option,Object(r.a)(Object(r.a)({},e),{},{children:[Object(S.jsx)("input",{type:"checkbox",checked:e.isSelected,onChange:function(){return null}})," "," ",Object(S.jsxs)("label",{children:[" ",e.label," "]})]}))})};var K=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(){var e;return Object(l.a)(this,s),(e=t.call(this)).handleDepChange=function(t){e.setState({filterDepartment:t,results:[],error:0}),console.log(t)},e.handleSubmit=function(t){t.preventDefault(),e.state.input.length>1&&e.props.history.push({pathname:"/searchLists/".concat(e.state.input),state:{filterDepartment:e.state.filterDepartment,filterLevel:e.state.filterLevel}})},e.clickEvent=function(t){t.stopPropagation(),e.setState({results:[],error:0})},e.getData=function(t,s,a){O.a.get("https://coursify-ece444.herokuapp.com/searchc",{params:{input:t,numResults:5,filterDepartment:s,filterLevel:a},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){if(console.log("it is ".concat(t.status)),console.log(e.state.filterDepartment),200===t.status){e.setState({results:[]}),console.log(t.data.courses);for(var s=t.data.courses,a=t.data.names,n=[],i=0;i<s.length;i++)n.push(s[i]);if(console.log("Here"),console.log(n.length),n.length>=0){for(var r=n.length,l=[],c=0;c<r;c++)l.push(Object(S.jsx)(z,{course_code:n[c],course_name:a[c]}));0===l.length?e.setState({result:[],error:1}):e.setState({results:l,error:0})}else if(0===t.data.length)alert("Course not found");else{e.setState({results:[],error:1})}}else 400===t.status&&alert("System Error. Please refresh")})).catch((function(t){console.log(t),e.setState({error:1})}))},e.state={input:"",results:[],error:0,filterLevel:null,filterDepartment:null},e.handleChange=e.handleChange.bind(Object(J.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(J.a)(e)),e.handleChangeLevel=e.handleChangeLevel.bind(Object(J.a)(e)),e}return Object(c.a)(s,[{key:"handleCourseRoute",value:function(e,t){console.log(t),this.props.history.push("/course/details/".concat(this.props.course_code),{course_code:t})}},{key:"handleChange",value:function(e){e.preventDefault(),this.setState({input:e.target.value});var t=[];if(console.log("handling change"),this.state.filterDepartment)for(var s=0;s<this.state.filterDepartment.length;s++)t.push(this.state.filterDepartment[s].value);var a=[];if(this.state.filterLevel)for(var n=0;n<this.state.filterLevel.length;n++)a.push(this.state.filterLevel[n].value);console.log(t),e.target.value.length>1&&this.getData(e.target.value,t,a)}},{key:"handleChangeLevel",value:function(e){this.setState({filterLevel:e,results:[],error:0}),console.log(e)}},{key:"render",value:function(){return Object(S.jsx)("div",{className:"SearchQuery",onClick:this.clickEvent,children:Object(S.jsxs)("div",{style:{marginTop:"10%"},children:[Object(S.jsx)("h1",{children:" Coursify "}),Object(S.jsx)("br",{}),Object(S.jsxs)("form",{onSubmit:this.handleSubmit,className:"search",children:[Object(S.jsx)("input",{placeholder:"Enter course code here",className:"text-input",type:"text",value:this.state.input,onChange:this.handleChange}),Object(S.jsx)("input",{type:"submit",value:"Search",className:"submit-button"}),Object(S.jsx)("ul",{id:"course_list",className:"dropdown_search_opt",children:Object(S.jsx)("div",{className:"search-result-display",children:1===this.state.error?Object(S.jsx)("h1",{children:"No such courses exist"}):this.state.results})}),Object(S.jsx)("div",{id:"dropdown_dep",children:Object(S.jsx)(Q.a,{options:W,onChange:this.handleDepChange,isMulti:!0,placeholder:"Department"})}),Object(S.jsx)("div",{id:"dropdown_level",children:Object(S.jsx)(Q.a,{options:V,onChange:this.handleChangeLevel,isMulti:!0,placeholder:"Level"})})]})]})})}}]),s}(a.Component),Z=Object(p.f)(K),X=s(9),$=s.n(X),ee=s(16),te=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;Object(l.a)(this,s),(a=t.call(this,e)).redirectCourse=function(e){a.props.history.push("/course/details/".concat(e),{course_code:e})},a.getDescriptions=function(e){O.a.get("https://coursify-ece444.herokuapp.com/course/descriptions",{params:{courses:e,filterDepartment:a.state.filterDepartment,filterLevel:a.state.filterLevel},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(e){console.log("it is ".concat(e.status));for(var t=e.data.course_descriptions,s=JSON.parse(t),n=[Object(S.jsxs)("div",{class:"title-column",children:[Object(S.jsx)("p",{children:"Course Code"}),Object(S.jsx)("p",{children:"Course Name"}),Object(S.jsx)("p",{children:"Credit Value"}),Object(S.jsx)("p",{children:"Department"})]})],i=0;i<s.length;i++){var r=[];r.push(Object(S.jsxs)("div",{class:"columns",children:[Object(S.jsx)("p",{children:s[i]["Course Code"]}),Object(S.jsx)("p",{children:s[i]["Course Name"]}),Object(S.jsx)("p",{children:s[i]["Credit Value"]}),Object(S.jsx)("p",{children:s[i].Department})]})),n.push(Object(S.jsx)("a",{href:"../courseDetails/".concat(s[i]["Course Code"]),style:{textDecoration:"none"},children:r}))}a.setState({results:n})})).catch((function(e){console.log(e),a.setState({error:1})}))},a.getCodes=function(){var e=Object(ee.a)($.a.mark((function e(t,s,n){return $.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O.a.get("https://coursify-ece444.herokuapp.com/searchc",{params:{input:t,numResults:10,filterDepartment:s,filterLevel:n},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(e){if(200===e.status){a.setState({results:[]});for(var t=e.data.courses,s=e.data.names,n=[],i=0;i<t.length;i++)n.push(t[i]);a.getDescriptions(n),n.length>0?a.setState({course_codes:n,course_names:s}):0===e.data.length?alert("No matching courses found"):a.setState({error:1})}else 400===e.status&&alert("System Error. Please refresh")})).catch((function(e){console.log(e),a.setState({error:1})}));case 1:case"end":return e.stop()}}),e)})));return function(t,s,a){return e.apply(this,arguments)}}(),a.state={input:e.match.params.input,filterLevel:e.location.state.filterLevel,filterDepartment:e.location.state.filterDepartment,course_codes:[],course_names:[],results:[],error:0},a.handleChange=a.handleChange.bind(Object(J.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(J.a)(a));var n=e.location.state.filterDepartment,i=e.location.state.filterLevel;console.log(i);var r=[];if(n)for(var c=0;c<n.length;c++)r.push(n[c].value);var o=[];if(i)for(var u=0;u<i.length;u++)o.push(i[u].value);return a.getCodes(a.state.input,r,o),a}return Object(c.a)(s,[{key:"handleChange",value:function(e){this.setState({input:e.target.value}),this.getData(e.target.value)}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.getData(this.state.input)}},{key:"render",value:function(){return Object(S.jsxs)("div",{className:"SearchQuery",children:[Object(S.jsx)("h1",{children:"Results"}),Object(S.jsx)("div",{className:"search-result-display",children:this.state.results})]})}}]),s}(a.Component),se=Object(p.f)(te),ae=s(41),ne=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).publishList=function(){O.a.post("https://coursify-ece444.herokuapp.com/api/list",{courses:a.state.courses}).then((function(e){console.log(e),a.setState({list_link:e.data.list_uuid})}))},a.state={courses:[],course_descriptions:[],list_link:""},a}return Object(c.a)(s,[{key:"componentDidMount",value:function(){for(var e=this,t=0;t<sessionStorage.length;t++){var s=sessionStorage.key(t);this.state.courses.push(s),this.setState({courses:this.state.courses})}O.a.get("https://coursify-ece444.herokuapp.com/course/descriptions",{params:{courses:this.state.courses},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){var s=JSON.parse(t.data.course_descriptions);e.setState({course_descriptions:s})}))}},{key:"render",value:function(){return Object(S.jsx)("div",{children:Object(S.jsxs)(m.a,{className:"page-content",children:[Object(S.jsx)(f.a,{children:Object(S.jsx)(v.a,{children:Object(S.jsx)("h1",{children:"Course List"})})}),Object(S.jsx)(f.a,{children:Object(S.jsx)(v.a,{children:Object(S.jsx)(b.a,{children:this.state.course_descriptions.map((function(e){return Object(S.jsx)(b.a.Link,{as:j.b,to:"/courseDetails/".concat(e["Course Code"]),children:Object(S.jsx)(ae.a,{style:{width:"18rem"},children:Object(S.jsxs)(ae.a.Body,{children:[Object(S.jsx)(ae.a.Title,{children:e["Course Code"]}),Object(S.jsxs)(ae.a.Text,{children:[e["Course Name"],Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),e.Division,Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),e.Department]})]})})},e["Course Code"])}))})})}),Object(S.jsx)(f.a,{children:Object(S.jsx)(v.a,{children:Object(S.jsx)("button",{className:"syllabus-link",onClick:this.publishList,children:"Publish"})})}),Object(S.jsx)(f.a,{children:Object(S.jsx)(v.a,{children:""!==this.state.list_link&&Object(S.jsx)(j.b,{target:"_blank",to:"/list/".concat(this.state.list_link),children:Object(S.jsx)("p",{children:"localhost:5000/list/"+this.state.list_link})})})})]})})}}]),s}(a.Component),ie=Object(p.f)(ne),re=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).state={courses:[]},a}return Object(c.a)(s,[{key:"componentDidMount",value:function(){var e=this;O.a.get("https://coursify-ece444.herokuapp.com/api/list",{params:{list_uuid:this.props.match.params.uuid},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){e.setState({courses:t.data.course_list}),O.a.get("https://coursify-ece444.herokuapp.com/course/descriptions",{params:{courses:e.state.courses},paramsSerializer:function(e){return x.a.stringify(e)}}).then((function(t){var s=JSON.parse(t.data.course_descriptions);e.setState({courses:s})}))}))}},{key:"render",value:function(){return Object(S.jsxs)(m.a,{children:[Object(S.jsx)(f.a,{children:Object(S.jsx)(v.a,{children:Object(S.jsx)("h1",{children:"Course List"})})}),Object(S.jsx)(f.a,{children:Object(S.jsx)(v.a,{children:Object(S.jsx)(b.a,{children:this.state.courses.map((function(e){return Object(S.jsx)(b.a.Link,{as:j.b,to:"/courseDetails/".concat(e["Course Code"]),children:Object(S.jsx)(ae.a,{style:{width:"18rem"},children:Object(S.jsxs)(ae.a.Body,{children:[Object(S.jsx)(ae.a.Title,{children:e["Course Code"]}),Object(S.jsxs)(ae.a.Text,{children:[e["Course Name"],Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),e.Division,Object(S.jsx)("br",{}),Object(S.jsx)("br",{}),e.Department]})]})})},e["Course Code"])}))})})})]})}}]),s}(a.Component),le=Object(p.f)(re),ce=s(108);var oe=function(e){var t,s,n=e.course_code,i=e.number_requests,l=e.syllabus_link,c=Object(a.useState)(l),o=Object(_.a)(c,2),u=o[0],h=o[1],d=Object(a.useState)(!1),b=Object(_.a)(d,2),j=b[0],p=b[1],m=Object(ce.a)(),g=m.register,y=m.handleSubmit,x=Object(S.jsx)(v.a,{className:"coll col-sm",children:i||0});return u&&!j?(t=Object(S.jsx)(v.a,{className:"coll col-7 col-link",children:Object(S.jsx)("a",{href:u,children:u})}),s=Object(S.jsx)(v.a,{className:"coll col-sm",children:Object(S.jsx)(N.a,{as:"input",className:"btn btn-primary link-button",type:"button",value:"Change Link",onClick:function(){p(!0)}})})):!1===j?(t=Object(S.jsx)(v.a,{className:"coll col-7 col-link"}),s=Object(S.jsx)(v.a,{className:"coll col-sm",children:Object(S.jsx)(N.a,{as:"input",className:"btn btn-primary link-button",type:"button",value:"Add Link",onClick:function(){p(!0)}})})):t=Object(S.jsx)(v.a,{className:"coll col-9",children:Object(S.jsxs)("form",{onSubmit:y((function(e,t){p(!1),h(e.syllabusURL),O.a.post("https://coursify-ece444.herokuapp.com/course/syllabus",{course_code:n,link:e.syllabusURL}).then((function(e){return console.log(JSON.parse(e.data))})).catch((function(e){console.log(e)}))})),children:[Object(S.jsx)("input",Object(r.a)({},g("syllabusURL"))),Object(S.jsx)("button",{type:"submit",children:"Submit"})]})}),Object(S.jsxs)(f.a,{className:"roww",children:[Object(S.jsx)(v.a,{className:"coll col-2",children:n}),x,t,s]})};s(179);var ue=function(){var e=Object(a.useState)(),t=Object(_.a)(e,2),s=t[0],n=t[1],i=Object(a.useState)(),l=Object(_.a)(i,2),c=l[0],o=l[1],u=Object(a.useState)(),h=Object(_.a)(u,2),d=h[0],b=h[1],j=Object(a.useState)(!1),p=Object(_.a)(j,2),g=p[0],y=p[1],x=function(){s?b(k(s)):O.a.get("https://coursify-ece444.herokuapp.com/api/syllabusList").then((function(e){var t=Object(r.a)({},JSON.parse(e.data));n(t),b(k(t))}))};Object(a.useEffect)((function(){x()}),[]);var C,k=function(e){var t=0;return Object.values(e).map((function(e){return Object(S.jsx)(oe,{course_code:e["Course Code"],number_requests:e.request_count,syllabus_link:e.link},t++)}))};return C=g?Object(S.jsx)(N.a,{as:"input",className:"btn btn-primary filter_list",type:"button",value:"Show Requested & Linked",onClick:function(){x(),y(!1)}}):Object(S.jsx)(N.a,{as:"input",className:"btn btn-primary filter_list",type:"button",value:"Show All",onClick:function(){c?b(k(c)):O.a.get("https://coursify-ece444.herokuapp.com/api/syllabusList",{params:{get_all:!0}}).then((function(e){var t=Object(r.a)({},JSON.parse(e.data));o(t),b(k(t))})),y(!0)}}),Object(S.jsxs)("div",{className:"panel",children:[Object(S.jsx)("div",{className:"title",children:"AdminPanel"}),C,Object(S.jsxs)(m.a,{children:[Object(S.jsxs)(f.a,{children:[Object(S.jsx)(v.a,{className:"col-2",children:"Course Code"}),Object(S.jsx)(v.a,{className:"col-sm",children:"Num. Req."}),Object(S.jsx)(v.a,{className:"col-6",children:"Link"}),Object(S.jsx)(v.a,{className:"col-3",children:"Option"})]}),d]})]})},he=function(e){Object(o.a)(s,e);var t=Object(u.a)(s);function s(e){var a;return Object(l.a)(this,s),(a=t.call(this,e)).logOut=function(){localStorage.setItem("username",""),a.setState({username:""})},a.state={username:localStorage.getItem("username"),login:!1},a}return Object(c.a)(s,[{key:"componentDidMount",value:function(){""!==localStorage.getItem("username")&&this.setState({username:localStorage.getItem("username")})}},{key:"render",value:function(){return Object(S.jsxs)(j.a,{children:[Object(S.jsx)("div",{children:Object(S.jsxs)(d.a,{bg:"002a5c",variant:"dark",sticky:"top",expand:"lg",children:[Object(S.jsxs)(d.a.Brand,{children:[Object(S.jsx)("img",{src:h,alt:""})," ",Object(S.jsx)(b.a.Link,{href:"/",style:{color:"white",display:"inline"},children:"Coursify"})]}),Object(S.jsx)(d.a.Toggle,{}),Object(S.jsx)(d.a.Collapse,{children:Object(S.jsxs)(b.a,{children:[Object(S.jsx)(b.a.Link,{as:j.b,to:"/about",children:"About"}),Object(S.jsx)(b.a.Link,{as:j.b,to:"/mylist",children:"Course List"})]})})]})}),Object(S.jsx)("div",{children:Object(S.jsxs)(p.c,{children:[Object(S.jsx)(p.a,{path:"/about",children:Object(S.jsxs)("div",{className:"body_text",align:"left",children:[Object(S.jsx)("p",{children:"Welcome to IO's improvement of CARTE's in-development tool for course selection at UofT. Coursify is a modificaiton of CARTE's original Education Pathways platform that allows for more intelligent course searching by matching not just the terms you search, but ones relevant to them. The more terms you search for, the more relevant your results will be! Even try searching across disciplines for the courses that best cover each. Whatever year you are looking for, Education Pathways will also suggest courses in earlier years that will best help you to prepare. To get the most out of this, try searching for courses in a later year and see what is suggested for your current one. We are looking for feedback to improve Education Pathways and make it more useful for students."}),Object(S.jsx)("p",{children:Object(S.jsx)("b",{children:"Development Team: "})}),Object(S.jsxs)("p",{children:["Alexander Olson ",Object(S.jsx)("a",{href:"https://carte.utoronto.ca/",children:"(CARTE)"})," and student team from ",Object(S.jsx)("a",{href:"https://shuiblue.github.io/UofT-ECE444/",children:"ECE444-Fall2022"}),": Americo B, Dennis L, Joseph S, Michael H and Sepehr T"]})]})}),Object(S.jsx)(p.a,{path:"/search",children:Object(S.jsx)(Z,{})}),Object(S.jsx)(p.a,{path:"/mylist",children:Object(S.jsx)(ie,{})}),Object(S.jsx)(p.a,{exact:!0,path:"/courseDetails/:code",render:function(e){return Object(S.jsx)(G,Object(r.a)({},e))}}),Object(S.jsx)(p.a,{exact:!0,path:"/searchLists/:input",render:function(e){return Object(S.jsx)(se,Object(r.a)({},e))}}),Object(S.jsx)(p.a,{exact:!0,path:"/list/:uuid",render:function(e){return Object(S.jsx)(le,Object(r.a)({},e))}}),Object(S.jsx)(p.a,{path:"/adminPanel",children:Object(S.jsx)(ue,{})}),Object(S.jsx)(p.a,{path:"/",children:Object(S.jsx)(Z,{})})]})})]})}}]),s}(a.Component),de=s.p+"static/media/footer.f57bcbca.png",be=function(){return Object(S.jsxs)("footer",{className:"footer",children:[Object(S.jsx)("img",{src:de,alt:""})," "]})};s(180);var je=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)("div",{className:"App",children:Object(S.jsx)(he,{})}),Object(S.jsx)("div",{className:"App",children:Object(S.jsx)(be,{})})]})},pe=(s(181),document.getElementById("root"));i.a.render(Object(S.jsx)(je,{}),pe)},73:function(e,t,s){e.exports={"reviews-form":"ReviewsForm_reviews-form__yACae","star-rating":"ReviewsForm_star-rating__n3h_K","star-input":"ReviewsForm_star-input__20QJC",star:"ReviewsForm_star__3t3fY"}},79:function(e,t,s){},96:function(e,t,s){}},[[182,1,2]]]);
//# sourceMappingURL=main.c97c2c1b.chunk.js.map