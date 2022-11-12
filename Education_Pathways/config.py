# This is to prevent circular imports

from pymongo import MongoClient
import os
from flask_cors import CORS
import csv

app = None
client = None
cors = None
list_of_course_strings = None
course_to_name = {}
course_to_dep = {}
course_to_div = {}

def init_app(app_):
    global app
    app = app_
    d_file = open('departments.csv')
    csvreader = csv.reader(d_file)
    for row in csvreader:
        course_to_dep[row[0]] = row[1]
    d_file.close()

    d_file = open('divisions.csv')
    csvreader = csv.reader(d_file)
    for row in csvreader:
        course_to_div[row[0]] = row[1]
    d_file.close()

    return app

def init_db(app):
    global client
    global list_of_course_strings
    pw = os.environ.get('MONGO_URI')
    client = MongoClient(f'mongodb+srv://flask_app_user:{pw}@cluster0.dmqmrxd.mongodb.net/?retryWrites=true&w=majority')
    db = client.courses
    coll = db.get_collection('engineering')
    list_of_courses = list(coll.find({}))
    for i in list_of_courses:
        course_to_name[i['Course Code']] = i['Course Name']
    list_of_course_strings = [x['Course Code'] for x in list_of_courses]
    return list_of_course_strings

def init_cors(app):
    global cors
    cors = CORS(app)
    return cors