from samsamoo import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(150), unique=True, nullable=False)
    company_short_data = db.Column(db.String(50), nullable=False)
    company_data = db.Column(db.Text(), nullable=False)
    company_url = db.Column(db.String(200), nullable=False)
    similarity = db.Column(db.Float, nullable=False)
    date_created = db.Column(db.DateTime(), nullable=False)


class Funding(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id', ondelete='CASCADE'), nullable=False)
    funded_amount = db.Column(db.Integer, nullable=False)
    target_date = db.Column(db.DateTime(), nullable=False)
    participant_count = db.Column(db.Integer, nullable=False)
    date_time = db.Column(db.DateTime(), nullable=False)

'''li.append(Company(company_name='롯데GRS', company_short_data='도소매, QSR', company_data='description', company_url='None', similarity=0, date_created=datetime.now())'''