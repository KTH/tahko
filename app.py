import os
import json
from datetime import date
import requests
from flask import Flask, render_template, request, abort

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
dbs = []

@app.route('/')
def login():
    return render_template('index.html')
