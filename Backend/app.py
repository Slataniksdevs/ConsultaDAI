from flask import Flask, jsonify, request
from config import connect
from flask_cors import CORS
from routes.users import usuarios_bp
from routes.login import login_bp
from routes.booking import booking_bp

app = Flask(__name__)
CORS(app)


app.register_blueprint(usuarios_bp)
app.register_blueprint(login_bp)
app.register_blueprint(booking_bp)

if __name__ == '__main__':
    app.run(debug=True)