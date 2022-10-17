# This is to prevent circular imports

from pymongo import MongoClient
import os
from flask_cors import CORS

app = None
client = None
cors = None
list_of_course_strings = None

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
    list_of_course_strings = [x['Course Code'] + ' ' + x['Course Name'] for x in list_of_courses]
    return list_of_course_strings

def init_cors(app):
    global cors
    cors = CORS(app)
    return cors