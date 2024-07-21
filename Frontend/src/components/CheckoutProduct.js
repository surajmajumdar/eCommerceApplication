import React, { useEffect, useState } from "react";
import "./CheckoutProduct.css";

function CheckoutProduct({
  index,
  id,
  image,
  title,
  price,
  rating,
  quantity,
  onItemRemoved,
  onQuantityChange,
}) {
  const [cartData, setCartData] = useState();
  const [localQuantity, setLocalQuantity] = useState(quantity);

  //useEffect to fetch cart Item
  useEffect(() => {
    fetch(`http://localhost:8080/cartDetails/getCartItem/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCartData(data);
        setLocalQuantity(data.quantity);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  //handles remove item from cart
  const removeFromBasket = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/cartDetails/deleteFromCart/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setCartData(null);
          alert("Item removed successfully!");
          console.log("Item removed");
          onItemRemoved();
        } else {
          throw new Error("Sorry didn't work!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  //handles increase in quantity
  const increaseQuantity = (e) => {
    e.preventDefault();

    const updatedQuantity = localQuantity + 1;
    setLocalQuantity(updatedQuantity);
    setCartData((prevCartData) => ({
      ...prevCartData,
      quantity: updatedQuantity,
    }));
    onQuantityChange(id, updatedQuantity);
  };

  //handles decrease in quantity
  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (localQuantity > 1) {
      const updatedQuantity = localQuantity - 1;
      setLocalQuantity(updatedQuantity);
      setCartData((prevCartData) => ({
        ...prevCartData,
        quantity: updatedQuantity,
      }));
      onQuantityChange(id, updatedQuantity);
    }
  };

  //useEffect to update the quantity in the database whenever quantity changes
  useEffect(() => {
    fetch("http://localhost:8080/cartDetails/updateQuantity", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Quantity updated Successfully!");
          console.log("Quantity updated");
        } else {
          throw new Error("Sorry quantity update didn't work!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [localQuantity]);

  return (
    <div className="checkout-product">
      <img src={image} className="checkout-product-image" />
      <div className="checkout-product-info">
        <p className="checkout-product-title">{title}</p>
        <p className="checkout-product-price">
          <small>₹ </small>
          <strong>{price}</strong>
        </p>
        <div className="checkout-product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
        <div className="checkout-product-quantity">
          <button onClick={decreaseQuantity} className="minus-button">
            -
          </button>
          <span className="checkout-product-quantity">
            Quantity : {localQuantity}
          </span>
          <button onClick={increaseQuantity} className="plus-button">
            +
          </button>
        </div>
        <button onClick={removeFromBasket}>Remove item from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
