# this is the controller

from flask import jsonify, request
from flask_restful import Resource, reqparse
# from flask_cors import cross_origin
import bson.json_util as json_util
from config import app, list_of_course_strings, client, course_to_name, course_to_dep, course_to_div, list_collection
from rapidfuzz import process, fuzz
from model import searchschema, courselistgetschema, courselistpostschema
from uuid import uuid1
from marshmallow import ValidationError
from werkzeug.exceptions import BadRequest

# -------------------- Course related --------------------
class SearchCourse(Resource):
    def get(self):
        searchschema.validate(request.args)
        input = request.args.get('input')
        numResults = request.args.get('numResults')


        hasDepartments = request.args.get('filterDepartment[0]')
        hasLevels = request.args.get('filterLevel[0]')

        departments = {}
        departments_max = 0
        counter = 0
        while not departments_max:
            c = request.args.get('filterDepartment[{}]'.format(counter))
            counter += 1
            if not c:
                departments_max = 1
            else:
                departments[c] = 0

        levels = {}
        levels_max = 0
        counter = 0
        while not levels_max:
            c = request.args.get('filterLevel[{}]'.format(counter))
            counter += 1
            if not c:
                levels_max = 1
            else:
                levels[c] = 0

        return_limit = 5

        if(numResults):
            return_limit = int(numResults)

        try:
            print(input)
            list_of_best_matches = process.extract(input, list_of_course_strings, limit=100, scorer=fuzz.partial_token_set_ratio)
            # print(course_to_name)

            matches = []
            for match in list_of_best_matches:
                matches.append(match[0])
            list_of_best_matches = matches

            course_names = []
            for match in list_of_best_matches:
                course_names.append(course_to_name[match])

            if hasLevels:
                filtered_matches = []
                for code in list_of_best_matches:
                    for char in code:
                        if char.isdigit():
                            if char in levels:
                                filtered_matches.append(code)
                            break
                list_of_best_matches = filtered_matches
                print("has levels")

            if hasDepartments:
                filtered_matches = []
                for code in list_of_best_matches:
                    if code in course_to_dep:
                        if course_to_dep[code] in departments:
                            filtered_matches.append(code)
                list_of_best_matches = filtered_matches
                print("has departments")


            list_of_best_matches = list_of_best_matches[:int(return_limit)] # minimize results returned

            print(list_of_best_matches)
            resp = jsonify(courses=list_of_best_matches, names=course_names)
            resp.status_code = 200
            return resp
        except Exception as e:
            print("This is the error: ", e)
            resp = jsonify({'error': 'something went wrong'})
            resp.status_code = 400
            return resp

class SearchList(Resource):
    def get(self):
        courses = []
        course_max = 0
        counter = 0
        while not course_max:
            c = request.args.get('courses[{}]'.format(counter))
            counter += 1
            if not c:
                course_max = 1
            else:
                courses.append(c)
        course_query = []
        for course in courses:
            course_query.append({"Course Code" : course})
        try:
            db = client.courses
            coll = db.get_collection('engineering')
            course_description = list(coll.find({
                "$or": course_query
            }))

            for i in range(len(course_description)):
                if course_description[i]["Course Code"] in course_to_dep:
                    course_description[i]["Department"] = course_to_dep[course_description[i]["Course Code"]]

                if course_description[i]["Course Code"] in course_to_div:
                    course_description[i]["Division"] = course_to_div[course_description[i]["Course Code"]]

            cd = json_util.dumps(course_description)
            # print(cd)
            resp = jsonify(course_descriptions=cd)
            resp.status_code = 200

            return resp
        except Exception as e:
            print(e)
            resp = jsonify({'error': 'something went wrong'})
            resp.status_code = 400
            return resp

class CourseList(Resource):
    def get(self):
        try:
            validation_errors = courselistgetschema.validate(request.args)
            if len(validation_errors) != 0:
                raise ValidationError(validation_errors)
            uuid = request.args.get('list_uuid')
            course_list_document = list_collection.find_one({ 'list_uuid': uuid })
            resp = jsonify({'course_list': course_list_document['course_list']})
            resp.status_code = 200
            return resp
        except ValidationError as e:
            resp = jsonify({'message': f'query body is invalid: {e}'})
            resp.status_code = 400
            return resp
        except Exception as e:
            resp = jsonify({'error': f'something went wrong: {e}'})
            resp.status_code = 500
            return resp

    def post(self):
        try:
            validation_errors = courselistpostschema.validate(request.json)
            if len(validation_errors) != 0:
                raise ValidationError(validation_errors)
            list_uuid = str(uuid1())
            list_collection.insert_one({'list_uuid': list_uuid, 'course_list': request.json['courses']})
            resp = jsonify({'list_uuid': list_uuid})
            resp.status_code = 200
            return resp
        except BadRequest as e:
            resp = jsonify({'message': f'{e}'})
            resp.status_code = 400
            return resp
        except ValidationError as e:
            resp = jsonify({'message': f'query body is invalid: {e}'})
            resp.status_code = 400
            return resp
        except Exception as e:
            resp = jsonify({'error': f'something else went wrong: {e}'})
            resp.status_code = 500
            return resp

class Syllabus(Resource):
    def get(self):
        course_code = request.args.get("course_code")
        try:
            db = client.syllabi
            coll = db.get_collection('engineering')
            course_syllabus_info = coll.find({"Course Code": course_code})
            resp = jsonify(json_util.dumps(course_syllabus_info))
            resp.status_code = 200
            return resp
        except Exception as e:
            print("Exception in Syllabus Controller: ", e)
            resp = jsonify({'Error': 'Something went wrong getting that syllabus info'})
            resp.status_code = 400
            return resp
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('course_code', required=True)
        parser.add_argument('link', required=False)
        data = parser.parse_args()
        course_code = data['course_code']
        try:
            db = client.syllabi
            coll = db.get_collection('engineering')
            if(data['link']):
                updatedDoc = coll.find_one_and_update(filter={"Course Code": course_code},update={'$set': {'link': data['link']}}, return_document=True)
            else:
                updatedDoc = coll.find_one_and_update(filter={"Course Code": course_code},update={'$inc': {'request_count': 1}}, return_document=True)
            resp = jsonify(json_util.dumps(updatedDoc))
            resp.status_code = 200
            return resp
        except Exception as e:
            print("Exception in Syllabus Controller: ", e)
            resp = jsonify({'Error': 'Something went wrong getting that syllabus info'})
            resp.status_code = 400
            return resp

class SyllabusList(Resource):
    def get(self):
        try:
            db = client.syllabi
            coll = db.get_collection('engineering')
            if(request.args.get("get_all")):
                syllabi = list(coll.find({}))
            else:
                syllabi = list(coll.find({"$or":[{"request_count": {"$gt":0}},{"link": {'$exists': 'true', '$not': {'$size': 0}}}]}))
            resp = jsonify(json_util.dumps(syllabi))
            resp.status_code = 200
            return resp
        except Exception as e:
            print("Exception in SyllabusList Controller: ", e)
            resp = jsonify({'Error': 'Something went wrong getting that syllabus info'})
            resp.status_code = 400
            return resp
# class ShowCourse(Resource):
#     def get(self):
#         code = request.args.get('code')
#         if not Course.objects(code=code):
#             resp = jsonify({'message': f"Course {code} doesn't exist"})
#             resp.status_code = 404
#             return resp
#         try:
#             resp = jsonify({'course': Course.get(code)})
#             resp.status_code = 200
#             return resp
#         except Exception as e:
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp
    
#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('code', required=True)
#         data = parser.parse_args()
#         code = data['code']
#         if not Course.objects(code=code):
#             resp = jsonify({'message': f"Course {code} doesn't exist"})
#             resp.status_code = 404
#             return resp
#         try:
#             resp = jsonify({'course': Course.get(code)})
#             resp.status_code = 200
#             return resp
#         except Exception as e:
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp


# class ShowCourseGraph(Resource):
#     def get(self):
#         code = request.args.get('code')
#         if not Course.objects(code=code):
#             resp = jsonify({'message': f"Course {code} doesn't exist"})
#             resp.status_code = 404
#             return resp
#         try:
#             resp = jsonify({'graph': Course.get_requisite_graph(code)})
#             resp.status_code = 200
#             return resp
#         except Exception as e:
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('code', required=True)
#         data = parser.parse_args()
#         code = data['code']
#         if not Course.objects(code=code):
#             resp = jsonify({'message': f"Course {code} doesn't exist"})
#             resp.status_code = 404
#             return resp
#         try:
#             resp = jsonify({'graph': Course.get_requisite_graph(code)})
#             resp.status_code = 200
#             return resp
#         except Exception as e:
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

# ------------------------------------------------------------

# -------------------- Wishlist related --------------------
# class UserWishlist(Resource):
#     def get(self):
#         username = request.args.get('username')
#         try:
#             resp = jsonify({'wishlist': User.get_wishlist(username_=username).expand()})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('username', required=True)
#         data = parser.parse_args()
#         username = data['username']
#         try:
#             resp = jsonify({'wishlist': User.get_wishlist(username_=username).expand()})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('code', required=True)
#         data = parser.parse_args()
#         code = data['code']
#         if not Course.objects(code=code):
#             resp = jsonify({'message': f"Course {code} doesn't exist"})
#             resp.status_code = 404
#             return resp        
# # ------------------------------------------------------------

# class UserWishlistAdd(Resource):
#     def get(self):
#         username = request.args.get('username')
#         code = request.args.get('code')
#         try:
#             course = Course.get(code)
#             wl = User.get_wishlist(username_=username)
#             wl.add_course(course)
#             resp = jsonify({'wishlist': wl.expand()})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('username', required=True)
#         parser.add_argument('code', required=True)
#         data = parser.parse_args()
#         username = data['username']
#         code = data['code']
#         try:
#             course = Course.get(code)
#             wl = User.get_wishlist(username_=username)
#             wl.add_course(course)
#             resp = jsonify({'wishlist': wl.expand()})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp


# class UserWishlistRemove(Resource):
#     def get(self):
#         username = request.args.get('username')
#         code = request.args.get('code')
#         try:
#             course = Course.get(code)
#             wl = User.get_wishlist(username_=username)
#             wl.remove_course(course)
#             resp = jsonify({'wishlist': wl.expand()})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('username', required=True)
#         parser.add_argument('code', required=True)
#         data = parser.parse_args()
#         username = data['username']
#         code = data['code']
#         try:
#             course = Course.get(code)
#             wl = User.get_wishlist(username_=username)
#             wl.remove_course(course)
#             resp = jsonify({'wishlist': wl.expand()})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp


# class UserWishlistMinorCheck(Resource):
#     def get(self):
#         username = request.args.get('username')
#         try:
#             wl = User.get_wishlist(username_=username)
#             courses = [c.code for c in wl.course]
#             print(courses)
#             check = Minor.check(codes_=courses)
#             print(check)
#             resp = jsonify({'minorCheck': check})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp
    
#     def post(self):
#         parser = reqparse.RequestParser()
#         parser.add_argument('username', required=True)
#         data = parser.parse_args()
#         username = data['username']
#         try:
#             wl = User.get_wishlist(username_=username)
#             courses = [c.code for c in wl.course]
#             print(courses)
#             check = Minor.check(codes_=courses)
#             print(check)
#             resp = jsonify({'minorCheck': check})
#             resp.status_code = 200
#             return resp
#         except Exception as e: 
#             resp = jsonify({'error': 'something went wrong'})
#             resp.status_code = 400
#             return resp

class AddReview(Resource):
    def get(self):
        courseCode = request.args.get('courseCode')
        firstName = request.args.get('firstName')
        lastName = request.args.get('lastName')
        review = request.args.get('review')
        stars = request.args.get('stars')
        try:
            db = client.reviews
            coll = db.get_collection('engineering')

            course_query = {"Course Code": courseCode}

            reviews = list(coll.find(course_query))[0]["Reviews"]

            review = {"first": firstName, "last": lastName, "review": review, "rating": stars}

            reviews.append(review)

            new_review = {"$set": {"Reviews": reviews}}

            coll.update_one(course_query, new_review)

            resp = jsonify()
            resp.status_code = 200

            return resp
        except Exception as e:
            print(e)
            resp = jsonify({'error': 'something went wrong'})
            resp.status_code = 400
            return resp

class ReviewsList(Resource):
    def get(self):
        courseCode = request.args.get('courseCode')
        try:
            db = client.reviews
            coll = db.get_collection('engineering')

            course_query = {"Course Code": courseCode}

            reviews = list(coll.find(course_query))[0]['Reviews']

            cd = json_util.dumps(reviews)
            # print(cd)
            resp = jsonify(reviews=cd)
            resp.status_code = 200

            return resp
        except Exception as e:
            print(e)
            resp = jsonify({'error': 'something went wrong'})
            resp.status_code = 400
            return resp