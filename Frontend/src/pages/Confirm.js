// pages/Confirmation.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get the order details from localStorage that was saved in Checkout.js
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
      
      // Optional: Clear the order from localStorage after displaying
      // localStorage.removeItem("lastOrder");
    }
  }, []);

  if (!order) {
    return (
      <div className="container">
        <div className="confirmation-page">
          <div className="confirmation-card card">
            <h1>Order Not Found</h1>
            <p>We couldn't find your order details. Please try placing your order again.</p>
            <div className="confirmation-actions">
              <Link to="/menu" className="button-link">
                Back to Menu
              </Link>
              <Link to="/" className="button-link secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="confirmation-page">
        <div className="confirmation-card card">
          <div className="confirmation-header">
            <div className="success-icon">🎉</div>
            <h1>Order Confirmed!</h1>
            <p className="confirmation-subtitle">
              Thank you for your order, <strong>{order.customer.name}</strong>!
            </p>
            <p className="order-number">
              Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>

          <div className="order-details">
            <div className="order-section">
              <h2>📦 Order Summary</h2>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">× {item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <strong>Total: ${order.total}</strong>
              </div>
            </div>

            <div className="order-section">
              <h2>🚚 Delivery Information</h2>
              <div className="delivery-info">
                <p><strong>Name:</strong> {order.customer.name}</p>
                <p><strong>Address:</strong> {order.customer.address}</p>
                <p><strong>Phone:</strong> {order.customer.phone}</p>
              </div>
            </div>

            <div className="order-section">
              <h2>⏰ Order Timing</h2>
              <div className="order-timing">
                <p><strong>Order Placed:</strong> {order.date}</p>
                <p><strong>Estimated Preparation:</strong> 15-20 minutes</p>
                <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/menu" className="button-link">
              Order Again
            </Link>
            <Link to="/" className="button-link secondary">
              Back to Home
            </Link>
          </div>
                <br/>
          <div className="confirmation-footer">
            <p>
              <strong>Hungry for more?</strong> We'll send you a text message when your order is on its way! 
            </p>
            <p className="contact-info">
              Questions? Call us at <strong>03 123 456</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;