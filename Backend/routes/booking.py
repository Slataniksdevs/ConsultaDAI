from flask import Blueprint, jsonify, request
from config import connect
import jwt

booking_bp = Blueprint('booking', __name__)

# Clave secreta para firmar los tokens JWT
SECRET_KEY = 'consultaArbeit'

@booking_bp.route('/reserva/servicio', methods=['POST'])
def create_booking():
    try:
        # Obtener los datos de la solicitud JSON
        data = request.json
        user_name = data.get('user_name')
        fecha_reserva = data.get('fecha_reserva')
        horario = data.get('horario')
        telefono = data.get('telefono')
        email = data.get('email')
        
        # Verificar si falta algún dato en la solicitud
        if not user_name or not fecha_reserva or not horario or not telefono or not email:
            return jsonify({'error': 'Faltan campos obligatorios'}), 400
        
        # Verificar si el token JWT está presente en la solicitud
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token de autorización faltante'}), 401

        # Decodificar y verificar el token JWT
        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            # Si el token es válido, continuar con la reserva
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401
        
        # Hacer la reserva en la base de datos
        conn = connect()
        cursor = conn.cursor()

        # Consulta para insertar la reserva
        cursor.execute(
            "INSERT INTO public.reserva (user_name, fecha_reserva, horario, telefono, email) VALUES (%s, %s, %s, %s, %s)",
            (user_name, fecha_reserva, horario, telefono, email)
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Reserva realizada con éxito'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
