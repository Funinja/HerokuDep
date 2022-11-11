[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8529947&assignment_repo_type=AssignmentRepo)
# Coursify - A Course Planning Tool
## Project Management
Jira is used in order to manage our project, and can be found [HERE](https://ece444team5.atlassian.net/jira/software/projects/CRS/boards/1). In order to access, you must be signed in using a utoronto.ca account.


# Project Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for frontend, and [Flask-tdd](https://github.com/mjhea0/flaskr-tdd) for backend.
We will be using MongoDB to host our database.

## 0. Before the project

Make sure you have all the prerequisites installed
* [Git](https://git-scm.com/downloads)
* [Python](https://www.python.org/downloads/) (python-3.10.6)
* nodejs

To install nodejs, go to [nodejs download]( https://nodejs.org/en/download/). Add `npm` to `PATH` as global variable.
 
## 1. Clone the repository to your local machine
```sh
$ git clone https://github.com/ECE444-2022Fall/Assignment_1_starter_template.git
```
## 2. To run the app in development

First, go to the `frontend` directory 
```sh
$ cd .\Education_Pathways\frontend\
```

to install the nodejs modules needed, run
```sh
$ npm install
```
then to start the app in development mode
```sh
$ npm start
```
## 3. To build the app for production to the `build` folder. Under the same `frontend` directory, run
```sh
$ npm run build
```
## 4. Deploy the project
   
We use Heroku to deploy the project online. To do this, first [sign up](https://signup.heroku.com/) for a Heroku account,  and then install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). The following steps are the complete guide for deploying to Heroku. But for deploying this project, some steps are optional (marked as `optional`), as the required files are already provided in the repo. 

4.1 If you are currently under the `frontend` directory, go back to the root directory
```sh
$ cd ..\..
```

4.2 Next, install a production-grade WSGI web server called [Gunicorn](http://gunicorn.org/):

```sh
$ pip install gunicorn==20.0.4
```

4.3 (`optional`) Create a [Procfile](https://devcenter.heroku.com/articles/procfile) in the project root:

```sh
$ touch Procfile
```

4.4 (`optional`) And add the following code:

```sh
web: gunicorn --chdir Education_Pathways index:app
```

4.5 (`optional`) Create a *requirements.txt* file to specify the external dependencies that need to be installed for the app to work:

```sh
$ touch requirements.txt
```

4.6 (`optional`) Add the requirements:

```
Flask==2.1.1
gunicorn==20.0.4
pytest==7.1.2
```

4.7 (`optional`) Create a *.gitignore* file in the project root:

```sh
$ touch .gitignore
```

4.8 (`optional`) And include the following files and folders (so they are not included in version control):

```sh
env
*.pyc
*.DS_Store
__pycache__
test.db
```

4.9 (`optional`) To specify the correct Python runtime, add a new file to the project root called *runtime.txt*:

```
python-3.10.4
```

4.10 (`optional`) Add a local Git repo:

```sh
$ git init
$ git add -A
$ git commit -m "initial"
```

4.11 Login to your Heroku account

```sh
$ heroku login
```

4.12 Deploy to Heroku, give your application a name on Heroku, for example, we name it `myapp-unique-name` here:

```sh
$ heroku create myapp-unique-name
```
4.13 Then set your heroku remote to the application you just created
```sh
$ heroku git:remote -a myapp-unique-name
```
4.14 Commit your local repo to Heroku remote
```sh
$ git add .
$ git commit -am "inital commit to heroku remote"
$ git push heroku main
```

4.15 Then to view the deployed app online, run the following command to open the webpage in your default browser.

```sh
$ heroku open
```
or go to your [Heroku account](https://dashboard.heroku.com/apps) and check your the url of your deployed app. (`https://myapp-unique-name.herokuapp.com/`)

## Dennis Lam: Pros and Cons of TDD

Tests I did:
* Checked to make sure that there is sufficient division and department data on courses when accessing the database
* Checked whether the autocomplete search results were given from our course names endpoint after the user begins typing in the searchbar
* Checked whether the course description endpoint gave sufficient descriptions of courses

Test Driven Development (TDD) is a methodology centered around the idea where you write and run test cases before developing code. The favorable quality of this methodology comes from its repeated use in developing tests before development. Writing test cases causes one to be forced to conform to a specific architecture, by providing clarity using test cases, to make functions and modules operate correctly. Specifically, test cases provide clearness to its developers by showing how the input and output of their code should function. This transparency in functional operations allows for code to be more easily maintainable, documentable, and easier for collaboration. However, since the test cases and test suite must be continuously updated and maintained, the quality and the repeated task of making test cases can become detrimental to the project. In terms of quality test cases, determining good test cases can become difficult for a project since a lot of time could be focused on what problems the developers are expecting instead of unforeseen problems of the project. Furthermore, the process of updating the test cases of your project as it develops can create a bottleneck for development from waiting for tests to be created. Additionally, refactoring any early work would require refactoring early test cases as well, increasing the amount of time it takes to work on a project with TDD. Overall, TDD provides consistency and clarity for developers to operate, but can be a hindrance if the team has a strict deadline and poor-quality test cases.
