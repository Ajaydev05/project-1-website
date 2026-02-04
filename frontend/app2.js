import { useState } from "react";
import "./app.css";

const products = [
  { id: 1, name: "T-Shirt", category: "Clothes", price: 20, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
  { id: 2, name: "Jeans", category: "Clothes", price: 40, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
  { id: 3, name: "Burger", category: "Food", price: 10, image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
  { id: 4, name: "Pizza", category: "Food", price: 15, image: "https://images.unsplash.com/photo-1548365328-8b849fdd3d4c" },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, change) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
    ));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filtered = products.filter((product) =>
    (category === "All" || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <header>
        <h1>🛒 Trendy Store</h1>
        <div>
          <button onClick={() => setDarkMode(!darkMode)}>🌓</button>
          <button onClick={() => setShowCart(true)}>Cart ({cart.length})</button>
        </div>
      </header>

      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <div className="filters">
        {["All", "Clothes", "Food"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={category === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div className="card-actions">
              <button onClick={() => addToCart(product)}>Add</button>
              <button onClick={() => toggleWishlist(product)}>
                {wishlist.find((item) => item.id === product.id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-drawer">
          <h2>🛍 Your Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <div>
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={() => setCheckout(true)}>Checkout</button>
          <button onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}

      {checkout && (
        <div className="checkout">
          <div className="checkout-box">
            <h2>💳 Checkout</h2>
            <p>Total: ${total}</p>
            <button onClick={() => { setCart([]); setCheckout(false); }}>
              Pay Now
            </button>
            <button onClick={() => setCheckout(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default app2;
