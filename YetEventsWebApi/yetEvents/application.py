from flask import Blueprint, redirect, render_template, url_for, request,jsonify
from flask_restplus import Api,Resource, fields
from werkzeug.utils import cached_property
from sqlalchemy.sql import text
import json

from yetEvents.model import *
from yetEvents.ma import *
from yetEvents import ma, change_to_date

bp = Blueprint('application', __name__, url_prefix='/YetEvents/api')
api=Api(bp, version='1.0', title = 'YetEvents API', description = 'Event Organizer API' )


user_schema = UserSchema()
users_schema = UserSchema(many=True)

event_schema = EventSchema()
events_schema = EventSchema(many=True)

tag_schema = TagSchema()
tags_schema = TagSchema(many=True)  

ticket_schema = TicketSchema()
tikets_schema = TicketSchema(many=True)

ticket_event_schema = TicketEventSchema()
tickets_events_schema = TicketEventSchema(many=True)

user = api.model("User",{
    'user_name' : fields.String,
    'email': fields.String,
    'password': fields.String,
    # 'created_events': fields.Nested(events_schema)
})

event = api.model("Event",{
    'title' : fields.String,
    'date': fields.DateTime,
    'description': fields.String,
    'image_url': fields.String,
    'location': fields.String,
    'organizer_id' : fields.Integer,

    'tags' : fields.List(fields.Integer, allow_null=True)
    # 'tags' : fields.Nested(tags_schema),
    # 'participants': fields.Nested(users_schema)

})

tag = api.model("Tag",{
    'tag_name' : fields.String,
    # 'events' : fields.Nested(events_schema)
})

tick = api.model("ticket",{
    'user_id' : fields.Integer,
    'event_id': fields.Integer,
})


userNamespace = api.namespace("Users", path="/users")
eventNamespace = api.namespace("Events", path="/events")
tagNamespace = api.namespace("Tags", path="/tags")
ticketNamespace = api.namespace("Tickets",path="/users")


# user endpoints
@userNamespace.route('')
class usersResource(Resource):


    def get(self):
        """
        Get all the Users
        """

        users = User.query.all()
      
        return users_schema.dump(users)
        # return {"a" : "aaa", "b" : "bbb"}

    @api.expect(user)
    def post(self):
        """
        Create a new User
        """
        new_user = User()
        new_user.user_name = request.json['user_name']
        new_user.email = request.json['email']
        new_user.password = request.json['password']

        print("-----------user added-------------")
        print(new_user.user_name)
        db.session.add(new_user)
        db.session.commit()

        return user_schema.dump(new_user)


@userNamespace.route('/<int:id>')
class usersResource1(Resource):

    def get(self, id):
        """
        Get a User
        """
        user = User.query.filter_by(id=id).first()

        if not user:
            return "User Not Found", 404
        return user_schema.dump(user)



# event endpoints /events
@eventNamespace.route('')
class eventsResource(Resource):

    def get(self):
        """
        Get all the Events
        """
        events = Event.query.all()
        events_list = []

        for event in events:
            tag_list = []
            for tag in event.tags:
                tag_list.append(tag.id)

            event_json = {
            "title": event.title,
            "date": event.date,
            "description": event.description,
            "image_url": event.image_url, 
            "location": event.location,
            "organizer_id": event.organizer_id, 
            "tags": tag_list
            }

            events_list.append(event_json)

        return events_schema.dump(events_list)

    @api.expect(event)
    def post(self):
        """
        Create an event
        """
        new_event = Event()
        json = request.get_json(force=True)
        new_event.title = json["title"]
        new_event.date = change_to_date(json["date"])
        new_event.description = json['description']
        new_event.image_url = json['image_url']
        new_event.location = json['location']
        new_event.organizer_id = json['organizer_id']
        for tag in json['tags']:
            new_event.tags.append(Tag.query.filter_by(id=tag).first())

        db.session.add(new_event)
        db.session.commit()

        event_json = {
            "title": json["title"],
            "date": json["date"],
            "description": json['description'],
            "image_url": json['image_url'], 
            "location": json['location'],
            "organizer_id": json['organizer_id'], 
            "tags": json['tags']
        }

        return event_schema.dump(event_json) 


# /events/id
@eventNamespace.route('/<int:id>')
class eventsResource1(Resource):

    def get(self, id):
        """
        Get  an event
        """
        event = Event.query.filter_by(id=id).first()
        
        if not event:
            return "Event Not Found", 404

        tag_list = []
        for tag in event.tags:
            tag_list.append(tag.id)

        event_json = {
            "title": event.title,
            "date": event.date,
            "description": event.description,
            "image_url": event.image_url, 
            "location": event.location,
            "organizer_id": event.organizer_id, 
            "tags": tag_list
        }

        return event_schema.dump(event_json)

    @api.expect(event)
    @api.response(204, 'Event successfully updated.')
    def put(self, id):
        """
        Updates an event
        """
        event = Event.query.filter_by(id=id).first()

        
        if not event:
            return "Event Not Found", 404

        json = request.get_json(force=True)
        event.title = json["title"]
        event.date = change_to_date(json["date"])
        event.description = json['description']
        event.image_url = json['image_url']
        event.location = json['location']
        event.organizer_id = json['organizer_id']

        for tagId in json['tags']:
            tag_in_db = Tag.query.filter_by(id=tagId).first()
            event.tags.append(tag_in_db)

        db.session.add(event)
        db.session.commit()

        return {"message": "Event successfully updated"}
        

# tags endpoints
@tagNamespace.route('')
class tagsResource(Resource):

    def get(self):
        """
        Get all the Tags
        """
        tags = Tag.query.all()
        return tags_schema.dump(tags)

    @api.expect(tag)
    def post(self):
        """
        Create a new Tag
        """

        new_tag = Tag()
        json = request.get_json(force=True)
        new_tag.tag_name = json["tag_name"]

        db.session.add(new_tag)
        db.session.commit()

        return tag_schema.dump(new_tag) 



@ticketNamespace.route('/<int:id>/tickets')
class ticketsResource(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return "User Not Found", 404

        params = {"user_id": id}
        statement = text("""select * from event where id in (select event_id from ticket where user_id=:user_id)""")
        # tickets=[]
        # event_ids = Ticket.query.filter_by(user_id=id).all()
        # for i in event_ids:
        #     tickets.append(Event.get(i))
        tickets = db.session.execute(statement, params).all()

        
        tickets_list = []
        for ticket in tickets:
            event = Event.query.filter_by(id=ticket.id).first()
            tag_list = []
            for tag in event.tags:
                tag_list.append(tag.id)
                
            ticket_json = {
                "title": ticket.title,
                "date": ticket.date,
                "description": ticket.description,
                "image_url": ticket.image_url,
                "location": ticket.location,
                "organizer_id": ticket.organizer_id, 
                "tags": tag_list
            }
            tickets_list.append(ticket_json)

        # return jsonify(tickets_list)
        return tikets_schema.dump(tickets_list)




    @api.expect(tick)
    def post(self, id):
        j = request.get_json(force=True)
        event_id = j["event_id"]

        params = {"uid": id, "eid": event_id}
        statement = text("""insert into ticket(user_id, event_id) values(:uid, :eid)""")
        db.session.execute(statement, params)
        db.session.commit()

        # not sure if this works
        # new_ticket = ticket()
        # new_ticket.user_id = id
        # new_ticket.event_id = event_id

        return jsonify({"user_id": id, "event_id": event_id })
        # return TicketEventSchema.dump(new_ticket)

@ticketNamespace.route('/<int:id>/tickets/<int:e_id>')
class ticketsResource1(Resource):

    def delete(self,id,e_id):

        user = User.query.filter_by(id=id).first()

        params = {"user_id": id, "event_id":e_id  }
        todel = """DELETE  from ticket WHERE user_id =:user_id AND event_id =:event_id""";
                
                
        db.session.execute(todel, params)
        db.session.commit()

        # todel = ticket.query.filter_by(and_(user_id = id , event_id=e_id)).frist()
        print("-------------------")
        print(todel)

        return {"message" : "Ticket successfully deleted"},