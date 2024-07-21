import React, { useEffect, useState } from "react";
import "./Order.css";
import { useLocation, useNavigate } from "react-router-dom";
import OrderTotal from "./OrderTotal";

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  const queryParams = new URLSearchParams(location.search);
  const totalQuantity = queryParams.get("totalQuantity");
  const subTotalValue = queryParams.get("subTotalValue");
  const [orderData, setOrderData] = useState({
    userId: userId,
    receiverName: "",
    receiverMobileNo: "",
    shippingAddress: "",
    paymentMethod: "Online",
    orderTotal: subTotalValue,
    orderDate: "",
    orderTime: "",
  });

  //handles change in thee order input fields
  const changeHandler = (e) => {
    e.preventDefault();
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  //handles cancel button
  const cancelButton = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };

  //handles place order button
  const placeOrderHandler = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const orderDate = currentDate.toDateString();
    const orderTime = currentDate.toLocaleTimeString();
    setOrderData({
      ...orderData,
      orderDate: orderDate,
      orderTime: orderTime,
    });
  };

  //useEffect to save order history in the database
  useEffect(() => {
    if (orderData.orderDate && orderData.orderTime) {
      fetch("http://localhost:8080/orderHistory/saveOrderHistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            throw new Error("Failed to add Product!");
          }
        })
        .then(() => {
          alert("Order added successfully!");
          fetch(`http://localhost:8080/cartDetails/deleteAllItems/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                console.log("Emptied basket");
                navigate("/orderplaced");
              } else {
                throw new Error("Sorry didn't work!");
              }
            })
            .catch((error) => {
              console.error(error.message);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [orderData]);

  return (
    <div className="order">
      <div className="order-left">
        <h2 className="order-title">Shipping Details</h2>
        <div className="order-form-container">
          <form onSubmit={placeOrderHandler}>
            <h5>Receiver's Name</h5>
            <input
              type="text"
              name="receiverName"
              onChange={changeHandler}
              required
            />
            <h5>Mobile No.</h5>
            <input
              type="number"
              name="receiverMobileNo"
              onChange={changeHandler}
              required
            />
            <h5>Shipping Address</h5>
            <input
              type="text"
              name="shippingAddress"
              onChange={changeHandler}
              required
            />
            <h5>Payment Method</h5>
            <select name="paymentMethod" onChange={changeHandler}>
              <option value="Online">Online</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
            <button type="submit" className="place-order-button">
              Place Order
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={cancelButton}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      <div className="edit-product-right">
        <OrderTotal
          totalQuantity={totalQuantity}
          subTotalValue={subTotalValue}
        />
      </div>
    </div>
  );
}

export default Order;
