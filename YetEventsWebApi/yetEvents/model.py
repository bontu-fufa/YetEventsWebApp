from yetEvents import db
from datetime import datetime



# many to many - Event - User
# ticket table
ticket = db.Table('ticket',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)

# many to many - Event - Tag
# tags  table
tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(80), unique=True, nullable=False)    
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False) 


    # one to many - user - event 
    # created_event column
    created_events = db.relationship('Event', backref = 'organizer', lazy = True)


class Event(db.Model):
    __tablename__ = "event"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)    
    date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String, nullable=False)
    image_url =  db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    # # organizer
    organizer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # tags
    tags = db.relationship('Tag', secondary=tags, lazy=True,
        backref=db.backref('events', lazy=True))
    # # participants
    participants = db.relationship('User', secondary=ticket, lazy=True,
        backref=db.backref('registered_to_events', lazy=True))

class Tag(db.Model):
    __tablename__ = "tag"
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String, nullable=False)    
