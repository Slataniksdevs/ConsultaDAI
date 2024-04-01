from flask import jsonify, request, Blueprint
from config import connect
from flask_cors import CORS

users_bp = Blueprint('users', __name__)

@users_bp.route('usuarios/users', methods=['POST'])
def create_user():
    # Obtener los datos del usuario de la solicitud
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone = data.get('phone')
    birthdate = data.get('birthdate')
    gender = data.get('gender')
    country = data.get('country')

    # Verificar que se proporcionen todos los campos necesarios
    if not (username and email and password and first_name and last_name):
        return jsonify({'error': 'Todos los campos obligatorios deben ser proporcionados'}), 400

    # Aquí insertarías al nuevo usuario en la tabla 'users'
    conn = connect()  # Suponiendo que tienes una función 'connect()' que te devuelve una conexión a la base de datos
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO public.users(username, email, password, first_name, last_name, phone, birthdate, gender, country)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (username, email, password, first_name, last_name, phone, birthdate, gender, country))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Usuario agregado correctamente'}), 201
