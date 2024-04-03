from flask import Flask,jsonify,request,Blueprint
from config import connect
from flask_cors import CORS
from flask_bcrypt import generate_password_hash
import hashlib
import bcrypt

usuarios_bp = Blueprint('usuario', __name__)

#POST PARA CREAR CLIENTE CON LA PASSWORD ENCRIPTADA
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

#GET PARA OBTENER CLIENTE (LISTA)
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

@usuarios_bp.route('/usuarios/update_cliente/<int:usuario_id>', methods=['PUT'])
def update_usuario(usuario_id):
    try:
        data = request.json
        print(data)  # Imprimir los datos recibidos
        print(usuario_id)  # Imprimir el ID de usuario recibido
        user_name = data['user_name']
        password = data['password']
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        phone = data['phone']
        birth_date = data['birth_date']
        address = data['address']
        
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("UPDATE public.cliente SET user_name=%s, password=%s, first_name=%s, last_name=%s, mail=%s, address=%s, phone=%s, birth_date=%s WHERE id=%s", (user_name, password, first_name, last_name, email, address, phone, birth_date, usuario_id))
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Usuario actualizado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


    
@usuarios_bp.route('/usuarios/delete_user/<int:usuario_id>', methods=['DELETE'])
def delete_user(usuario_id):
    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM public.cliente WHERE id=%s", (usuario_id,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Usuario borrado exitosamente'}),200
    except Exception as e:
        return jsonify ({'error': str(e)}),500
    

#GET USER_PASS PARA LOGIN 

import hashlib

@usuarios_bp.route('/usuarios/login', methods=['POST'])
def login():
    try:
        # Obtener los datos del formulario de inicio de sesión enviado por el cliente
        user_name = request.json.get('user_name')
        password = request.json.get('password')

        # Consultar la base de datos para obtener la contraseña encriptada del usuario
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("SELECT password FROM public.user_login WHERE user_name = %s;", (user_name,))
        stored_password_hash = cursor.fetchone()
        cursor.close()

        # Verificar si se encontró la contraseña en la base de datos
        if stored_password_hash:
            # Obtener el hash almacenado de la base de datos
            stored_password_hash = stored_password_hash[0]

            # Hashear la contraseña ingresada por el usuario
            password_hash = bcrypt.hashpw(password.encode(), stored_password_hash.encode())

            # Comparar los hashes
            if password_hash == stored_password_hash:
                return jsonify({'message': 'Inicio de sesión exitoso'})
            else:
                return jsonify({'error': 'Credenciales incorrectas'}), 401
        else:
            return jsonify({'error': 'Usuario no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

