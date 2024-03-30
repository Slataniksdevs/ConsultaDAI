import psycopg2

#Configuracion a la base de datos

DB_CONFIG = {
    'dbname' : 'consulta_dai_dev',
    'user' : 'postgres',
    'password' : 'Postgres$37116',
    'host' : 'tmp.enred.cl'
}


def connect():
    conn =  psycopg2.connect(**DB_CONFIG)
    return conn