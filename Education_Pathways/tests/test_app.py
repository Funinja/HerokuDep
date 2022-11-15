from index import app
from minor import check_course_in_minor
from flask.testing import FlaskClient
from config import course_to_dep, course_to_div, course_to_name

import pytest
import json

# Jean
def test_check_course_in_minor():
    course = "MIE439H1S"
    minor = "Biomedical Engineering Minor"
    result = check_course_in_minor(course)

    assert result == minor

# Cansin
def test_user_register_endpoint():
    tester = app.test_client()
    response = tester.get("/user/register")

    assert response.status_code == 200

def test_user_login_endpoint():
    tester = app.test_client()
    response = tester.get("/user/login")

    assert response.status_code == 200

def test_search_endpoint():
    tester = app.test_client()
    response = tester.get("/search")

    assert response.status_code == 200

def test_course_details_endpoint():
    tester = app.test_client()
    response = tester.get("/course/details?code=ECE318H1")

    assert response.status_code == 200

def test_course_graph_endpoint():
    tester = app.test_client()
    response = tester.get("/course/graph?code=ECE318H1")

    assert response.status_code == 200

def test_user_wishlist_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist")

    assert response.status_code == 200

def test_user_wishlist_addCourse_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist/addCourse")

    assert response.status_code == 200

def test_user_wishlist_removeCourse_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist/removeCourse")

    assert response.status_code == 200

def test_user_wishlist_minorCheck_endpoint():
    tester = app.test_client()
    response = tester.get("/user/wishlist/minorCheck")

    assert response.status_code == 200\

# Joseph
# Test addition of course list to database and fetching of course list from database 
def test_create_and_fetch_course_list_success():
    tester = app.test_client()

    courses = ['ECE454H1', 'ECE444H1', 'ECE467H1', 'AER525H1']
    response = tester.post('/api/list', json={
        'courses': courses
    })
    assert response.status_code == 200

    data = response.get_data(as_text=True)
    json_data = json.loads(data)
    assert 'list_uuid' in json_data 
    assert type(json_data['list_uuid']) is str

    response = tester.get(f"/api/list?list_uuid={json_data['list_uuid']}")
    assert response.status_code == 200

    data = response.get_data(as_text=True)
    json_data = json.loads(data)
    assert 'course_list' in json_data 
    assert json_data['course_list'] == courses

# Joseph
# Test failure of fetching of course lists
def test_fetch_course_list_failure():
    tester = app.test_client()

    response = tester.get('/api/list')
    assert response.status_code == 400

    response = tester.post('/api/list?uuid=random')
    assert response.status_code == 400

# Joseph
# Test failure of creation of course lists
def test_create_course_list_failure():
    tester = app.test_client()

    response = tester.post('/api/list')
    assert response.status_code == 400

    response = tester.post('/api/list', json={
        'random': 'random'
    })
    assert response.status_code == 400

# Dennis
# Test whether there is a correct number of divisions and departments for each course
def test_check_correct_num_divisions_departments():
    assert len(course_to_name) < len(course_to_dep)
    assert len(course_to_dep) == len(course_to_div)

# Dennis
# Check if course codes are being returned from partial code input
def test_check_search_course_names():
    tester = app.test_client()
    response = tester.get(
        "/searchc?input=ECE3&numResults=5", 
        )

    courses = ['ECE302H1', 'ECE311H1', 'ECE313H1', 'ECE314H1', 'ECE316H1']


    for i in range(len(response.json['courses'])):
        assert response.json['courses'][i] in courses

    assert response.status_code == 200

# Dennis
# Check whether course descriptions are given correctly by the endpoint
def test_check_course_descriptions():
    tester = app.test_client()
    response = tester.get(
        "/course/descriptions?courses%5B0%5D=ECE302H1&courses%5B1%5D=ECE311H1&courses%5B2%5D=ECE313H1&courses%5B3%5D=ECE314H1&courses%5B4%5D=ECE316H1&courses%5B5%5D=ECE318H1&courses%5B6%5D=ECE320H1&courses%5B7%5D=ECE324H1&courses%5B8%5D=ECE326H1&courses%5B9%5D=ECE330H1&filterDepartment=&filterLevel=", 
        )

    test_json = [
   {
      "Course Code":"ECE302H1",
      "Course Name":"Probability and Applications",
      "Credit Value":"0.50",
      "Details":"Events, sample space, axioms of probability. Discrete and continuous random variables, distribution and density functions. Bernoulli trials, Binomial, geometric, Poisson, exponential and Gaussian distributions.Expectation, moments, characteristic function and correlation coefficient. Functions of random variables. Random vectors, joint distributions, transformations. Applications will be chosen from communication theory, estimation and hypothesis testing, predictive analytics and other areas of electrical and computer engineering.",
      "Prerequisites":"['MAT290H1', 'MAT291H1', 'ECE216H1']",
      "Corequisites":"",
      "Exclusion":"['ECE286H1']",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE311H1",
      "Course Name":"Introduction to Control Systems",
      "Credit Value":"0.50",
      "Details":"An introduction to dynamic systems and their control. Differential equation models of mechanical, electrical, and electromechanical systems. State variable form. Linearization of nonlinear models and transfer functions. Use of Laplace transform to solve ordinary differential equations. Conversion of models from state variable form to transfer function representation and vice versa. Block diagrams and their manipulation. Time response: transient analysis and performance measures. Properties of feedback control systems. Steady state tracking:the notion of system type. The concept of stability of feedback systems, Routh-Hurwitz stability criterion. Frequency response and stability in the frequency domain. Root locus. Bode and Nyquist plots and their use in feedback control design.",
      "Prerequisites":"['MAT290H1', 'MAT291H1', 'ECE216H1']",
      "Corequisites":"",
      "Exclusion":"",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE313H1",
      "Course Name":"Energy Systems and Distributed Generation",
      "Credit Value":"0.50",
      "Details":"Three-phase systems; steady-state transmission line model; symmetrical three-phase faults; power system stability; symmetrical components; unsymmetrical faults and fault current calculation; distribution network; equivalent steady-state model of voltage-sourced converter; distributed energy resources (DR); distributed energy storage; interface between DR and power system.",
      "Prerequisites":"",
      "Corequisites":"",
      "Exclusion":"['ECE413H1']",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE314H1",
      "Course Name":"Fundamentals of Electrical Energy Systems",
      "Credit Value":"0.50",
      "Details":"High-efficiency energy conversion via switched-mode power electronic circuits: design and steady-state modeling of DC/DC converters, DC/AC converters using pulse-width modulation. Transistor switch realization and basic efficiency analysis in power electronic converters. AC power quality and power factor, including non-sinusoidal currents. Energy conversion via magnetic devices: Faraday's law for time varying fields, characterization of hysteresis and eddy current losses in magnetic materials, modelling of magnetic circuits, transformer and inductor modelling and design. Introduction to electromechanical energy conversion: Lorentz Force, concepts of energy, co-energy, forces between ferromagnetic materials carrying flux, simple magnetic actuators, introduction to synchronous machines.",
      "Prerequisites":"['ECE212H1', 'ECE221H1', 'ECE231H1']",
      "Corequisites":"",
      "Exclusion":"['ECE349H1']",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE316H1",
      "Course Name":"Communication Systems",
      "Credit Value":"0.50",
      "Details":"An introductory course in analog and digital communication systems. Analog and digital signals. Signal representation and Fourier transforms; energy and power spectral densities; bandwidth. Distortionless analog communication; amplitude, frequency and phase modulation systems; frequency division multiplexing. Sampling, quantization and pulse code modulation (PCM). Baseband digital communication; intersymbol interference (ISI); Nyquist's ISI criterion; eye diagrams. Passband digital communications; amplitude-, phase- and frequency-shift keying; signal constellations. Performance analysis of analog modulation schemes in the presence of noise. Performance analysis of PCM in noise.",
      "Prerequisites":"['MAT290H1', 'ECE216H1', 'MAT389H1', 'ECE355H1', 'Complicated']",
      "Corequisites":"",
      "Exclusion":"",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE318H1",
      "Course Name":"Fundamentals of Optics",
      "Credit Value":"0.50",
      "Details":"Geometric Optics: Spherical surfaces, lenses and mirrors, optical imaging systems, matrix method, and aberrations. Polarization: Polarizer and polarizations, anisotropic materials, dichroism, birefringence, index ellipsoid, waveplates, optical activity, Faraday effect. Interference: superposition of waves, longitudinal and transverse coherence, Young's double-slit experiment, Michelson and Fabry-Perot interferometer, thin-films. Diffraction and Fourier Optics: diffraction theory, single and double slits, diffraction gratings, spatial filtering, basic optical signal processing. (Background preparation in ECE320H1 F - Fields and Waves, or ECE357H1 S - Electromagnetic Fields, is strongly recommended.)",
      "Prerequisites":"['ECE221H1', 'ECE259H1']",
      "Corequisites":"",
      "Exclusion":"",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE320H1",
      "Course Name":"Fields and Waves",
      "Credit Value":"0.50",
      "Details":"Voltage and current waves on a general transmission line, characteristic impedance, reflections from the load and source, transients on a transmission line, Smith's chart and impedance matching. Maxwell's equations, wave equation, constitutive relations, dispersion, boundary conditions. Plane wave propagation in lossless and lossy media, polarization, power flow and Poynting vector. Plane wave reflection and transmission at material boundaries. Waveguides; propagating and evanescent waveguide modes and cut-off frequencies.",
      "Prerequisites":"['ECE221H1']",
      "Corequisites":"",
      "Exclusion":"",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE324H1",
      "Course Name":"Machine Intelligence, Software and Neural Networks",
      "Credit Value":"0.50",
      "Details":"An introduction to machine learning engineering, with a focus on neural networks. The entire process of developing a machine learning solution, from data collection to software development, as well as ethics in machine learning, will be discussed. Practical techniques in machine learning will be covered, including data augmentation and the use of pre-trained networks. Topics covered will include the fundamentals of neural networks, convolutional neural networks, recurrent neural networks, generative adversarial networks and transformer networks. Students will complete a major hands-on project in machine learning.",
      "Prerequisites":"['ESC190H1', 'ECE286H1', 'ECE421H1']",
      "Corequisites":"",
      "Exclusion":"['APS360H1']",
      "Recommended Preparation":"",
      "Department":"Division of Engineering Science",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE326H1",
      "Course Name":"Programming Languages",
      "Credit Value":"0.50",
      "Details":"Study of programming styles and paradigms. Included are object-oriented scripting functional and logic-based approaches. Languages that support these programming styles will be introduced. Languages treated include Python, Lisp or Scheme and Prolog.",
      "Prerequisites":"",
      "Corequisites":"",
      "Exclusion":"['CSC324H1', 'CSC326H1']",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   },
   {
      "Course Code":"ECE330H1",
      "Course Name":"Quantum and Semiconductor Physics",
      "Credit Value":"0.50",
      "Details":"The course introduces the principles of quantum physics and uses them to understand the behaviour of semiconductors. Topics to be covered include wave-particle duality, Schrodinger's equation, energy quantization, quantum mechanical tunnelling, electrons in crystalline semiconductors and other physical concepts that form the basis for nanotechnology, microelectronics, and optoelectronics.",
      "Prerequisites":"['ECE221H1', 'ECE231H1']",
      "Corequisites":"",
      "Exclusion":"['MSE235H1']",
      "Recommended Preparation":"",
      "Department":"Edward S. Rogers Sr. Dept. of Electrical & Computer Engin.",
      "Division":"Faculty of Applied Science & Engineering"
   }]

    original_list = response.json['course_descriptions']

    for sect in test_json: #check if it has all exclusions, details, prerequisites, etc
        for element in sect:
            assert sect[element] in original_list


    assert response.status_code == 200

# Michael
# Test add/review endpoint
def test_add_review_endpoint():
    tester = app.test_client()
    response = tester.get("/course/addreview")

    assert response.status_code == 400

# Test add/review endpoint
def test_course_reviews_endpoint():
    tester = app.test_client()
    response = tester.get("/course/reviews")

    assert response.status_code == 400

# Test if reviews are being saved
def test_reviews_addition():
    tester = app.test_client()

    response = tester.get("/course/addreview?courseCode=ECE444H1&firstName=Loren&lastName=Ipsum&review=Good+Course&stars=5")
    assert response.status_code == 200

    response = tester.get("/course/reviews?courseCode=ECE444H1")
    assert response.status_code == 200

    data = response.get_data(as_text=True)

    assert '{\\"first\\": \\"Loren\\", \\"last\\": \\"Ipsum\\", \\"review\\": \\"Good Course\\", \\"rating\\": \\"5\\"}' in data 


# Americo
# Test getting a syllabus info
# Test if reviews are being saved
def test_getting_course_info():
    tester = app.test_client()

    response = tester.get("/course/syllabus?course_code=ECE110H1")
    assert response.status_code == 200

    data = response.get_data(as_text=True)

    assert 'ECE110H1' in data 

def test_increase_request_count():
    tester = app.test_client()

    tester.get("/course/syllabus?course_code=ECE110H1")
    assert response.status_code == 200
    request_count = response.json['request_count']

    response = tester.post("/course/syllabus")
    assert response.status_code == 200

    new_request_count = response.json['request_count']

    assert new_request_count == request_count + 1

def test_change_syllabus_link():
    tester = app.test_client()

    tester.get("/course/syllabus?course_code=TEP281H1")
    assert response.status_code == 200
    link = response.json['link']
    new_link = link + 1;

    response = tester.post("/course/syllabus", {link: new_link})
    assert response.status_code == 200

    new_request_link = response.json['link']

    assert new_link == new_request_link
