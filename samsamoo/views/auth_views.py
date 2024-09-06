from flask import Blueprint, request, session
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from samsamoo import db
from samsamoo.models import User, Company

bp = Blueprint('login', __name__, url_prefix='/login')


@bp.route('/', methods=['POST'])
def login():
    status = {"result": "success"}
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        user = User.query.filter_by(email=email).first()
        pwd_receive = data["password"]
        if user is not None and check_password_hash(user.password, pwd_receive):
            session.clear()
            session['user_id'] = user.id
            return status

        else:
            status["result"] = "fail"
            return status


@bp.route('/signup/', methods=['GET', 'POST'])
def signup():
    status = {"result": "success"}
    if request.method == 'POST':
        data = request.json
        username = data['username']
        email = data['email']
        pwd = data['password']
        user = User.query.filter_by(username=username).first()
        if user is None:
            user = User(username=username, password=generate_password_hash(pwd), email=email)
            db.session.add(user)
            db.session.commit()
        else:
            status["result"] = "fail"

    return status
