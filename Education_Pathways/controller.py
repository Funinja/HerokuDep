# this is the controller

from flask import jsonify, request
from flask_restful import Resource, reqparse
# from flask_cors import cross_origin
import bson.json_util as json_util
from config import app, list_of_course_strings, client, course_to_name, course_to_dep, course_to_div
from rapidfuzz import process, fuzz
from model import searchschema


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
            list_of_best_matches = process.extract(input, list_of_course_strings, limit=100, scorer=fuzz.partial_ratio)
            # print(course_to_name)

            matches = []
            for match in list_of_best_matches:
                if(match[0][:len(input)] == input ):
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


            list_of_best_matches = list_of_best_matches[:int(numResults)] # minimize results returned

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
