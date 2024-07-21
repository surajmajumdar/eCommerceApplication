import React, { useEffect, useState } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

function Product({ id, title, image, price, rating }) {
  const userId = localStorage.getItem("userId");
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const productId = id;
  const [quantity, setQuantity] = useState(1);
  const [cartData, setCartData] = useState({
    userId: userId,
    productId: productId,
    quantity: quantity,
  });

  //shows product in a single product view
  const singleProductView = (e) => {
    e.preventDefault();
    navigate(`/singleproductview/${productId}`);
  };

  //handles edit product button
  const editProduct = (e) => {
    navigate(`/editproduct/${productId}`);
  };

  //handles change  in quantity
  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  //handles change  in quantity
  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 1) setQuantity(quantity - 1);
  };

  //useEffect to update quantity change
  useEffect(() => {
    setCartData((prevCartData) => ({
      ...prevCartData,
      quantity: quantity,
    }));
  }, [quantity]);

  //useEffect to fetch user details of a particular user
  useEffect(() => {
    if (userId > 0) {
      fetch(`http://localhost:8080/userDetails/getUser/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUserDetails(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, []);

  //handles the add to basket button and saves the product into the database
  const addToBasket = () => {
    fetch("http://localhost:8080/cartDetails/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error("Failed to add to cart!");
        }
      })
      .then(() => {
        alert("Added to cart successfully!");
        console.log("Added to basket");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} onClick={singleProductView} />
      <div className="product-quantity">
        <button onClick={decreaseQuantity} className="minus-button">
          -
        </button>
        <span className="product-quantity">Quantity to add : {quantity}</span>
        <button onClick={increaseQuantity} className="plus-button">
          +
        </button>
      </div>
      <button onClick={addToBasket} className="add-to-basket-button">
        Add to basket
      </button>
      {userDetails.accountType === "admin" && (
        <button onClick={editProduct} className="edit-button">
          Edit Product
        </button>
      )}
    </div>
  );
}

export default Product;
