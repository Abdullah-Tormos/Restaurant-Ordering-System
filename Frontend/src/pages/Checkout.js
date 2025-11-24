// Checkout.js
import { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      alert("Please fill in all fields");
      return;
    }

    // Save order to localStorage (simulated backend)
    const order = {
      customer: form,
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    clearCart();
    navigate("/confirmation"); // Redirect to home instead of non-existent confirmation page
  };

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-content">
        {/* Order Summary */}
        <div className="order-summary card">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <h2 className="total">
            Total: <span>${total}</span>
          </h2>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form card">
          <h2>Your Information</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" className="button-primary">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}