import React, { useEffect, useState } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const userId = localStorage.getItem("userId");
  const [cartData, setCartData] = useState();
  const [checkoutProductData, setCheckoutProductData] = useState();
  const [basketIsEmpty, setBasketIsEmpty] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [subTotalValue, setSubTotalValue] = useState(0);

  //empties the cart items in the database
  const emptyBasket = (e) => {
    e.preventDefault();
    if (subTotalValue > 0) {
      fetch(`http://localhost:8080/cartDetails/deleteAllItems/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Basket emptied!");
            console.log("Basket emptied");
            setCheckoutProductData([]);
            setTotalQuantity(0);
            setSubTotalValue(0);
            setBasketIsEmpty(true);
            setRenderKey((prevKey) => prevKey + 1);
          } else {
            throw new Error("Sorry didn't work!");
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else alert("Please add some products in the basket first!!");
  };

  //handles the remove item button
  const handleItemRemoved = (index) => {
    const updatedData = [...checkoutProductData];
    updatedData.splice(index, 1);
    setCheckoutProductData(updatedData);
  };

  //handles the quantitiy change
  const handleQuantityChange = (productId, newQuantity) => {
    let newTotalQuantity = 0;
    let newSubTotalValue = 0;

    checkoutProductData.forEach(([cartDetail, product]) => {
      if (cartDetail.cartItemId === productId) {
        newTotalQuantity += newQuantity;
        newSubTotalValue += newQuantity * product.price;
      } else {
        newTotalQuantity += cartDetail.quantity;
        newSubTotalValue += cartDetail.quantity * product.price;
      }
    });

    setTotalQuantity(newTotalQuantity);
    setSubTotalValue(newSubTotalValue);
  };

  //useEffect to fetch all the cart items from the database
  useEffect(() => {
    fetch(`http://localhost:8080/cartDetails/getAllCartItems/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cart items fetched");
        setCartData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  //useEffect to fetch the product details from the cart details
  useEffect(() => {
    fetch(
      `http://localhost:8080/cartDetails/getCartDetailsWithProduct/${userId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Cart details along with product data fetched");
        setCheckoutProductData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  //useEffect to handle the change in quantity and subtotal value
  useEffect(() => {
    let totalQuantity = 0;
    let subTotalValue = 0;

    if (checkoutProductData) {
      checkoutProductData.forEach(([cartDetail, product]) => {
        totalQuantity += cartDetail.quantity;
        subTotalValue += cartDetail.quantity * product.price;
      });
    }

    setTotalQuantity(totalQuantity);
    setSubTotalValue(subTotalValue);
  }, [checkoutProductData]);

  return (
    <div key={renderKey} className="checkout">
      <div className="checkout-left">
        <div>
          <h2 className="checkout-title">Your Shopping Basket</h2>
          {checkoutProductData &&
            checkoutProductData.map(([cartDetail, product], index) => (
              <CheckoutProduct
                key={cartDetail.cartItemId}
                id={cartDetail.cartItemId}
                title={product.productTitle}
                image={product.imageURL}
                price={product.price}
                rating={product.rating}
                quantity={cartDetail.quantity}
                onItemRemoved={() => handleItemRemoved(index)}
                onQuantityChange={handleQuantityChange}
              />
            ))}
        </div>
      </div>
      <div className="checkout-right">
        <Subtotal totalQuantity={totalQuantity} subTotalValue={subTotalValue} />
        <button onClick={emptyBasket} className="empty-basket-button">
          Empty Basket
        </button>
      </div>
    </div>
  );
}

export default Checkout;
