from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime


SECRET_KEY = '99999525410sdf'
SQLALCHEMY_DATABASE_URI = 'sqlite:///YetEvents.db'

app = Flask(__name__)
app.config.from_mapping(
    SECRET_KEY = SECRET_KEY,
    SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS = False
)

db = SQLAlchemy(app)
ma = Marshmallow(app)

def init_db_command():
    db.create_all()


def change_to_date(str_date):
    date_time_obj = datetime.strptime(str_date, '%Y-%m-%d %H:%M:%S')
    return date_time_obj

from . import application
app.register_blueprint(application.bp)