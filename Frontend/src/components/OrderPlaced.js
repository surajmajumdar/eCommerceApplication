import React from "react";
import "./OrderPlaced.css";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  //handles back to home button
  const backToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="order-placed">
      <h1>Order Placed! Thankyou for shopping with us 💖</h1>
      <button onClick={backToHome}>Back to home</button>
    </div>
  );
}

export default OrderPlaced;
