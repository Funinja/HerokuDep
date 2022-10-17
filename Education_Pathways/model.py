from marshmallow import Schema, fields

class SearchQuerySchema(Schema):
    input = fields.String(required=True)

searchschema = SearchQuerySchema()
