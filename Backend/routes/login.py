from flask import Flask,jsonify,request,Blueprint
from config import connect
from flask_cors import CORS
from flask_bcrypt import generate_password_hash
import hashlib
import bcrypt
import jwt

login_bp = Blueprint('login', __name__)

# Clave secreta para firmar los tokens JWT
SECRET_KEY = 'consultaArbeit'

#POST USER_PASS PARA LOGIN 

@login_bp.route('/login/inicio', methods=['POST'])
def login():
    try:
        # Obtener los datos del formulario de inicio de sesión enviado por el cliente
        user_name = request.json.get('user_name')
        password_plain = request.json.get('password') 
        rol = request.json.get('rol')

        # Consultar la base de datos para obtener la contraseña encriptada del usuario
        conn = connect()
        cursor = conn.cursor()
        cursor.execute("SELECT password,rol FROM public.user_login WHERE user_name = %s;", (user_name,))
        stored_password_hex = cursor.fetchone()  # Contraseña en formato hexadecimal
        cursor.close()

        # Verificar si se encontró la contraseña en la base de datos
        if stored_password_hex:
            # Decodificar la contraseña almacenada de su formato hexadecimal a una cadena de bytes
            stored_password_bytes = bytes.fromhex(stored_password_hex[0][2:])  # Ignorar el prefijo \x24 al inicio

            # Comparar la contraseña ingresada por el usuario con la contraseña almacenada
            if bcrypt.checkpw(password_plain.encode(), stored_password_bytes):
                # Generar un token JWT válido
                token = jwt.encode({'user_name': user_name}, SECRET_KEY, algorithm='HS256')
                rol  = rol
                # Devolver el token JWT al cliente
                return jsonify({'token': token,'rol': rol}), 200
            else:
                return jsonify({'error': 'Credenciales incorrectas'}), 401
        else:
            return jsonify({'error': 'Usuario no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500



