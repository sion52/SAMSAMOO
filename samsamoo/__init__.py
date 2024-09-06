from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import config

# Flask 애플리케이션 생성
app = Flask(__name__)
app.config.from_object(config)

# SQLAlchemy 및 Flask-Migrate 초기화
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# CORS를 적용
CORS(app)

# 블루프린트 및 뷰 등록
from . import models
from .views import main_views, auth_views, funding_views
app.register_blueprint(main_views.bp)
app.register_blueprint(auth_views.bp)
app.register_blueprint(funding_views.bp)