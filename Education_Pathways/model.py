from marshmallow import Schema, fields

class SearchQuerySchema(Schema):
    input = fields.String(required=True)
    numResults = fields.Integer()

class CourseListPostSchema(Schema):
    courses = fields.List(fields.String(), required=True)

class CourseListGetSchema(Schema):
    uuid = fields.String(required=True)

searchschema = SearchQuerySchema()
courselistpostschema = CourseListPostSchema()
courselistgetschema = CourseListGetSchema()