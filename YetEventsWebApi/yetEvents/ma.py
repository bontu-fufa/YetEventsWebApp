from flask_marshmallow import Marshmallow
from yetEvents.model import *

ma = Marshmallow()

class UserSchema(ma.Schema):
    class Meta:
        fields = ("user_name", "email", "password")

        model = User


class EventSchema(ma.Schema):
    class Meta:
        fields = ("title", "date", "description", 'image_url', 'location', "organizer_id", "tags", "participants")

        model = Event

class TagSchema(ma.Schema):
    class Meta:
        fields = ("id","tag_name")
        model = Tag

class TicketSchema(ma.Schema):
    class Meta:
        fields = ("title", "date", "description", 'image_url', 'location', "organizer_id", "tags")
        model = ticket
class TicketEventSchema(ma.Schema):
    class Meta:
        fields = ("user_id", "event_id")
        model = ticket