<h1>Comando para ejecutar <b>Backend</b> local</h1>

<h3>Pasos</h3>

#si no tienes el ambiente virtual creado
<p>1.  python -m venv venv </p>

#avanzar hasta la carpeta script y activar el entorno virtual
<p>2. ../backend/venv/script/./activate para activar ambiente virtual</p>

#Instalar las dependencias  y librerias que usa el backend
<p>3.  pip install -r requirements.txt</p>


pip freeze > requirements.txt

![alt text](image.png)


#SCRIPT DE LA BASE DE DATOS

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(20) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    mail VARCHAR(100),
    address VARCHAR(100),
    phone VARCHAR(13),
    birth_date DATE
);

CREATE TABLE instalacion (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(100),
    telefono VARCHAR(15),
    correo VARCHAR(100)
);

CREATE TABLE horario (
    id SERIAL PRIMARY KEY,
    dia VARCHAR(10),
    hora_inicio TIME,
    hora_termino TIME,
    estado_disponibilidad VARCHAR(20),
    id_instalacion INTEGER REFERENCES instalacion(id)
);

CREATE TABLE reserva (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) REFERENCES cliente(user_name),
    fecha_reserva DATE,
    horario TIME WITH TIME ZONE, 
    telefono VARCHAR(13),
    email VARCHAR(100)
);

CREATE TABLE historial_reserva (
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER REFERENCES cliente(id),
    id_instalacion INTEGER REFERENCES instalacion(id),
    fecha_reserva DATE REFERENCES reserva(fecha_reserva),
    hora_inicio TIME,
    hora_termino TIME
);
CREATE TABLE user_login (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

# FUNCION Y TRIGGER PARA QUE AL REGISTRAR UN CLIENTE NUEVO, EL USER_NAME Y 
# PASSWORD SE INSERTEN AUTOMATICAMENTE EN USER_LOGIN 

CREATE OR REPLACE FUNCTION insert_user_login()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_login (user_name, password)
    VALUES (NEW.user_name, NEW.password);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cliente_insert_trigger
AFTER INSERT ON cliente
FOR EACH ROW
EXECUTE FUNCTION insert_user_login();


PRIMER LOGIN EXITOSO 

![alt text](image-1.png)