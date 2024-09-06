from flask import Blueprint, request, session
from samsamoo import db
from samsamoo.models import Funding, Company
from datetime import datetime

bp = Blueprint('funding', __name__, url_prefix='/funding')


@bp.route('/', methods=['GET'])
def funding_list():
    funding_list = []
    for company in Company.query.all():
        funding_list.append({"name": company.company_name , "data": company.company_short_data})

    return funding_list


@bp.route('/<int:company_name>', methods=['GET'])
def funding_detail(company_name):
    data = {}
    if request.method == 'GET':
        company = Company.query.filter_by(company_name=company_name).first()
        data = {
            "name": company.company_name,
            "data": company.company_short_data,
        }
    return data


@bp.route('/sorted', methods=['GET'])
def funding_sorted():
    recomm1_data = [{'company_name': '동성화학공업(주)', 'similarity_score': 91.45084381103516}, {'company_name': '인천스마트시티(주)', 'similarity_score': 91.28187561035156}, {'company_name': '주식회사 충남알루미늄', 'similarity_score': 90.69293975830078}, {'company_name': '(주)지성이엔씨', 'similarity_score': 90.68135833740234},
                   {'company_name': '아성정밀화학(주)', 'similarity_score': 90.01676177978516}, {'company_name': '㈜프로네어', 'similarity_score': 90.01397705078125}, {'company_name': '㈜브이티엘', 'similarity_score': 89.80757904052734}, {'company_name': '삼심기계', 'similarity_score': 89.04130554199219},
                   {'company_name': '비에스티', 'similarity_score': 88.76042938232422}, {'company_name': '(주)코넥', 'similarity_score': 88.11935424804688}, {'company_name': '(주)세영테크놀러지', 'similarity_score': 87.86650848388672}, {'company_name': '하봉정푸드', 'similarity_score': 87.54734802246094},
                   {'company_name': '디엠테크컨설팅', 'similarity_score': 87.45069122314453}, {'company_name': '㈜성우산기', 'similarity_score': 87.41984558105469}, {'company_name': '(주)아이지', 'similarity_score': 87.21401977539062}, {'company_name': '㈜코리아퍼스텍', 'similarity_score': 87.01508331298828},
                   {'company_name': '(주)퀀텀센싱', 'similarity_score': 86.79974365234375}, {'company_name': '주식회사 에스엠뿌레', 'similarity_score': 86.5508804321289}, {'company_name': '(주)에코바이오의학연구소', 'similarity_score': 86.48503112792969}, {'company_name': '세일단조', 'similarity_score': 86.41734313964844}]

    funding_list = []

    for i in range(len(recomm1_data)):
        company = Company.query.filter_by(company_name=recomm1_data[i]['company_name']).first()
        funding_list.append({"name": company.company_name , "data": company.company_short_data})

    return funding_list




