from flask import Blueprint, redirect, render_template, url_for, request
from flask_restplus import Api,Resource, fields
from werkzeug.utils import cached_property

from yetEvents.model import *
from yetEvents.ma import *
from yetEvents import ma

bp = Blueprint('application', __name__, url_prefix='/YetEvents/api')
api=Api(bp, version='1.0', title = 'YetEvents API', description = 'Event Organizer API' )


user_schema = UserSchema()
users_schema = UserSchema(many=True)

event_schema = EventSchema()
events_schema = EventSchema(many=True)

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)  

user = api.model("User",{
    'user_name' : fields.String,
    'email': fields.String,
    'password': fields.String,
    'created_events': fields.Nested(events_schema)
})

event = api.model("Event",{
    'title' : fields.String,
    'date': fields.DateTime,
    'description': fields.String,
    'image_url': fields.String,
    'location': fields.String,
    'tags' : fields.Nested(tags_schema),
    'participants': fields.Nested(users_schema)

})

tags = api.model("Tag",{
    'tag_name' : fields.String,
    'events' : fields.Nested(events_schema)
})




@api.route('/users')
class usersResource(Resource):

    def get(self):
        """
        Get all the Users
        """

        users = User.query.all()
        return users_schema.dump(users)
        # return {"a" : "aaa", "b" : "bbb"}

    @api.expect()
    def post(self):
        """
        Create a new User
        """
        new_user = User()
        new_user.user_name = request.json['user_name']
        new_user.email = request.json['email']
        new_user.password = request.json['password']

        db.session.add(new_user)
        db.session.commit()

        return dinner_schema.dump(new_user)
