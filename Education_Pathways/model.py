from marshmallow import Schema, fields

class SearchQuerySchema(Schema):
    input = fields.String(required=True)
    numResults = fields.Integer()

searchschema = SearchQuerySchema()
