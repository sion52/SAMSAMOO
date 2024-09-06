from flask import Blueprint, request, jsonify

from samsamoo.models import Funding, Company

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('home', methods=['GET'])
def home():
    data = []
    if request.method == 'GET':
        new_company_list = Company.query.order_by(Company.date_created.desc()).limit(4)
        recommended_company_list = Company.query.order_by(Company.similarity.desc()).limit(4)
        for i in range(4):
            dic = {"name": new_company_list[i].company_name, "data": new_company_list[i].company_short_data}
            data.append(dic)
        for i in range(4):
            dic = {"name": recommended_company_list[i].company_name, "data": recommended_company_list[i].company_short_data}
            data.append(dic)

    return jsonify(data)
