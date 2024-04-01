from flask import Flask,jsonify,request,Blueprint
from config import connect
from flask_cors import CORS

usuarios_bp = Blueprint('usuario', __name__)

@usuarios_bp.route('/usuarios/get_user', methods = ['GET'])
def get_users():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM public.users;")
    usuarios_data = cursor.fetchall()
    cursor.close()
    usuarios_list = []
    for usuario in usuarios_data:
        usuario_dict =  {
            'id': usuario[0],
            'username': usuario[1],
            'email' : usuario[2],
            'password': usuario[3],
            'first_name': usuario [4],
            'last_name': usuario[5],
            'phone': usuario[6],
            'birthdate': usuario[7],
            'gender': usuario[8],
            'country': usuario[9]
        }
        usuarios_list.append(usuario_dict)
    return jsonify(usuarios_list)
        
        
        
        # username, email, password, first_name, last_name, phone, birthdate, gender, country