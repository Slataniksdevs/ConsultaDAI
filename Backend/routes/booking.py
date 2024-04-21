from flask import Blueprint, jsonify, request
from config import connect
from flask_cors import CORS
import jwt
from datetime import datetime, time


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
        hora_inicio = data.get('hora_inicio')
        hora_termino = data.get('hora_termino')
        telefono = data.get('telefono')
        email = data.get('email')
        
        # Verificar si falta algún dato en la solicitud
        if not user_name or not fecha_reserva or not hora_inicio or not hora_termino or not telefono or not email:
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

        # Consulta para insertar la reserva con los nombres de los campos correctos
        cursor.execute(
            "INSERT INTO public.reserva (user_name, fecha_reserva, hora_inicio, hora_termino, telefono, email) VALUES (%s, %s, %s, %s, %s, %s)",
            (user_name, fecha_reserva, hora_inicio, hora_termino, telefono, email)
        )
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Reserva realizada con éxito'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500




#MOSTRAR LAS RESERVAS REALIZADAS
@booking_bp.route('/booking/list_booking', methods=['GET'])
def get_bookings():
    conn = connect()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            c.user_name,
            c.first_name,
            c.last_name,
            c.mail,
            r.fecha_reserva,
            c.phone,
            r.hora_inicio,
            r.hora_termino
        FROM
            cliente c
        JOIN
            reserva r ON c.user_name = r.user_name;
    """)

    booking_data = cursor.fetchall()

    cursor.close()

    booking_list = []
    for booking in booking_data:
        booking_dict = {
            'user_name': booking[0],
            'first_name': booking[1],
            'last_name': booking[2],
            'mail': booking[3],
            'fecha_reserva': booking[4].strftime("%Y-%m-%d"),
            'phone': booking[5],
            'hora_inicio': booking[6].strftime("%H:%M"),
            'hora_termino': booking[7].strftime("%H:%M")
        }
        booking_list.append(booking_dict)

    return jsonify(booking_list)