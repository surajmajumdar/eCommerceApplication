import React, { useEffect, useState } from "react";
import "./OrderHistory.css";

function OrderHistory() {
  const userId = localStorage.getItem("userId");
  const [orderData, setOrderData] = useState([]);

  //useEffect to fetch all the order history details for a particular user
  useEffect(() => {
    fetch(`http://localhost:8080/orderHistory/getAllOrders/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order History fetched");
        setOrderData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="order-history">
      <h2 className="order-history-title">Your Order History</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Receiver's Name</th>
            <th>Mobile No.</th>
            <th>Order Date</th>
            <th>Order Time</th>
            <th>Order Total</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.receiverName}</td>
              <td>{order.receiverMobileNo}</td>
              <td>{order.orderDate}</td>
              <td>{order.orderTime}</td>
              <td>₹ {order.orderTotal}</td>
              <td>{order.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
