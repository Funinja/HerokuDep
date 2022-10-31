# This is to prevent circular imports

from pymongo import MongoClient
import os
from flask_cors import CORS

app = None
client = None
cors = None
list_of_course_strings = None
course_to_name = {}

def init_app(app_):
    global app
    app = app_
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