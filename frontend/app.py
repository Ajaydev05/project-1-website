from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

MONGO_URI = os.environ.get("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["mydatabase"]
collection = db["users"]

@app.route("/api")
def home():
    return jsonify({"message": "Backend running 🚀"})

@app.route("/api/users", methods=["GET"])
def get_users():
    users = list(collection.find({}, {"_id": 0}))
    return jsonify(users)

@app.route("/api/users", methods=["POST"])
def add_user():
    data = request.json
    collection.insert_one(data)
    return jsonify({"status": "User added"}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
