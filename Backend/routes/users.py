from flask import Flask,jsonify,request,Blueprint
from config import connect
from flask_cors import CORS
from flask_bcrypt import generate_password_hash

usuarios_bp = Blueprint('usuario', __name__)

#POST PARA CREAR USUARIO CON LA PASSWORD ENCRIPTADA
@usuarios_bp.route('/usuarios/clientes', methods=['POST'])
def register():
    try:
        data = request.json
        user_name = data['user_name']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        phone = data['phone']
        birth_date = data['birth_date']
        address = data['address']

        #encriptar la password
        hashed_password = generate_password_hash(password)

        conn = connect()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO public.cliente(
                user_name, password, first_name, last_name, mail, address,
                phone, birth_date
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, 
        (user_name, hashed_password, first_name, last_name, email, address,
         phone, birth_date)
        )
        conn.commit()
        conn.close()

        return jsonify({'message': 'Usuario registrado correctamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#GET PARA OBTENER USUARIOS (LISTA)
@usuarios_bp.route('/usuarios/get_clientes', methods = ['GET'])
def get_users():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM public.cliente;")
    usuarios_data = cursor.fetchall()
    cursor.close()
    usuarios_list = []
    for usuario in usuarios_data:
        usuario_dict =  {
            'id': usuario[0],
            'user_name': usuario[1],
            'password' : usuario[2],
            'first_name': usuario[3],
            'last_name': usuario [4],
            'email': usuario[5],
            'phone': usuario[6],
            'birth_date': usuario[7],
            'address': usuario[8],
            
        }
        usuarios_list.append(usuario_dict)
    return jsonify(usuarios_list)
        
        
        
