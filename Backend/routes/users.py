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
        tipo_usuario = data['tipo_usuario']

        #encriptar la password
        hashed_password = generate_password_hash(password)

        conn = connect()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO public.cliente(
                user_name, password, first_name, last_name, mail, address,
                phone, birth_date,tipo_usuario
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s)
        """, 
        (user_name, hashed_password, first_name, last_name, email, address,
         phone, birth_date, tipo_usuario)
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
            'adress': usuario[6],
            'phone': usuario[7],
            'birth_day': usuario[8],
            'tipo_usuario': usuario[9]
            
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
        address = data['address'],
        tipo_usuario = data['tipo_usuario']
        
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("UPDATE public.cliente SET user_name=%s, password=%s, first_name=%s, last_name=%s, mail=%s, address=%s, phone=%s, birth_date=%s, tipo_usuario=%s WHERE id=%s", (user_name, password, first_name, last_name, email, address, phone, birth_date,tipo_usuario, usuario_id))
        
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
    
    


#ENDPOINT PARA ACTUALIZAR PASSWORD USUARIO DESDE EL LOGIN
@usuarios_bp.route('/usuarios/change_pass/<int:usuario_id>', methods=['PUT'])
def change_pass(usuario_id):
    try:
        # Obtener la nueva contraseña del cuerpo de la solicitud
        data = request.json
        nueva_password = data['password']

        # Conexión a la base de datos
        conn = connect()
        cursor = conn.cursor()

        # Ejecutar la función actualizar_password en la base de datos
        cursor.execute("SELECT actualizar_password(%s, %s)", (usuario_id, nueva_password))
        
        # Confirmar la transacción y cerrar la conexión
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Contraseña actualizada correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


### ENDPOINT PARA BUSCAR USER BY ID
@usuarios_bp.route('/usuarios/get_user_by_id/<int:usuario_id>', methods=['GET'])
def get_user_by_id(usuario_id):
    try:
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM public.cliente WHERE id=%s", (usuario_id,))
        user_data = cursor.fetchone()
        conn.close()
        
        if user_data:
            user = {
                'id': user_data[0],
                'user_name': user_data[1],
                'password': user_data[2],
                'first_name': user_data[3],
                'last_name': user_data[4],
                'email': user_data[5],
                'address': user_data[6],
                'phone': user_data[7],
                'birth_date': user_data[8],
                'tipo_usuario': user_data[9]
            }
            return jsonify(user), 200
        else:
            return jsonify({'message': 'Usuario no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500