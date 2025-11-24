
import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

const MenuCardItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="menu-card">
      <div className="menu-card-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="menu-card-content">
        <h3>{item.name}</h3>
        <p className="menu-description">{item.description}</p>
        <div className="menu-card-footer">
          <span className="price">${item.price.toFixed(2)}</span>
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {showToast && (
        <div className="simple-toast">
          ✅ {item.name} added to cart!
        </div>
      )}
    </div>
  );
};

export default MenuCardItem;