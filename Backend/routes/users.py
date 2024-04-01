from flask import Flask,jsonify,request,Blueprint
from config import connect
from flask_cors import CORS
from flask_bcrypt import generate_password_hash

usuarios_bp = Blueprint('usuario', __name__)

#POST PARA CREAR USUARIO CON LA PASSWORD ENCRIPTADA
@usuarios_bp.route('/usuarios/register', methods=['POST'])
def register():
    try:
        data = request.json
        username = data['username']
        email = data['email']
        password = data['password']
        first_name = data['first_name']
        last_name  = data['last_name']
        phone  = data['phone']
        birthdate  = data['birthdate']
        gender  = data['gender']
        country  = data['country']
        
        #encriptar la password
        hashed_password = generate_password_hash(password)
        
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO public.users(
                username, email, password, first_name, last_name,
                phone, birthdate, gender, country
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            username, email, hashed_password, first_name, last_name,
            phone, birthdate, gender, country
        ))
        conn.commit()
        conn.close()
    
        return jsonify({'message': 'Usuario registrado correctamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        

#GET PARA OBTENER USUARIOS (LISTA)
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
        
        
        
