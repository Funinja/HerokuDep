# this is the controller

from flask import jsonify, request
from flask_restful import Resource, reqparse
# from flask_cors import cross_origin
from config import app, list_of_course_strings
from rapidfuzz import process, fuzz
from model import searchschema


# -------------------- Course related --------------------
class SearchCourse(Resource):
    def get(self):
        searchschema.validate(request.args)
        input = request.args.get('input')
        if len(input) < 4:
            resp.status_code = 200
            return resp
        try:
            list_of_best_matches = process.extract(input, list_of_course_strings, limit=5, scorer=fuzz.partial_ratio)
            print(list_of_best_matches)
            resp = jsonify(list_of_best_matches)
            resp.status_code = 200
            return resp
        except Exception as e:
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
