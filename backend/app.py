from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv("MONGO_URI", "mongodb://db:27017/")
client = MongoClient(mongo_uri)
db = client["store_db"]

products_col = db["products"]
cart_col = db["cart"]
wishlist_col = db["wishlist"]

# ------------------------
# Seed Products (only if empty)
# ------------------------
if products_col.count_documents({}) == 0:
    products_col.insert_many([
        {"name": "T-Shirt", "category": "Clothes", "price": 20, "image": "https://source.unsplash.com/400x300/?tshirt"},
        {"name": "Jeans", "category": "Clothes", "price": 40, "image": "https://source.unsplash.com/400x300/?jeans"},
        {"name": "Burger", "category": "Food", "price": 10, "image": "https://source.unsplash.com/400x300/?burger"},
        {"name": "Pizza", "category": "Food", "price": 15, "image": "https://source.unsplash.com/400x300/?pizza"},
    ])

# ------------------------
# PRODUCTS
# ------------------------
@app.route("/api/products", methods=["GET"])
def get_products():
    products = list(products_col.find())
    for p in products:
        p["_id"] = str(p["_id"])
    return jsonify(products)


# ------------------------
# CART
# ------------------------
@app.route("/api/cart", methods=["GET"])
def get_cart():
    items = list(cart_col.find())
    for i in items:
        i["_id"] = str(i["_id"])
    return jsonify(items)

@app.route("/api/cart", methods=["POST"])
def add_to_cart():
    data = request.json
    cart_col.insert_one(data)
    return jsonify({"message": "Added to cart"})

@app.route("/api/cart/<id>", methods=["DELETE"])
def remove_from_cart(id):
    cart_col.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Removed from cart"})


# ------------------------
# WISHLIST
# ------------------------
@app.route("/api/wishlist", methods=["GET"])
def get_wishlist():
    items = list(wishlist_col.find())
    for i in items:
        i["_id"] = str(i["_id"])
    return jsonify(items)

@app.route("/api/wishlist", methods=["POST"])
def add_to_wishlist():
    data = request.json
    wishlist_col.insert_one(data)
    return jsonify({"message": "Added to wishlist"})

@app.route("/api/wishlist/<id>", methods=["DELETE"])
def remove_from_wishlist(id):
    wishlist_col.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Removed from wishlist"})


@app.route("/api", methods=["GET"])
def health():
    return jsonify({"status": "E-commerce backend running 🚀"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
