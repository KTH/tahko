import os
import json
from datetime import date
import requests
from flask import Flask, render_template, request, abort
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
socketio = SocketIO(app)
dbs = []

@app.route('/')
def login():
    return render_template('index.html')

@socketio.on('blob')
def handle_blob(blob, myId):
    print(myId)
    emit('blob', (blob, myId), broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
