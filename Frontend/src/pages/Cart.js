import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Cart.css'

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = getCartTotal().toFixed(2);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container">
      <h1 className="page-title">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="card center">
          <p>Your cart is empty.</p>
          <Link to="/menu" className="button-link">
            Go to Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item card">
                <div className="item-info">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(item.id)}>
                    −
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button onClick={() => addToCart(item)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary card">
            <h2>
              Total: <span>${totalPrice}</span>
            </h2>

            <div className="cart-actions">
              <button onClick={clearCart} className="button-secondary">
                Clear Cart
              </button>

              <button onClick={handleCheckout} className="button-primary">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}