import React, { useState } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //handles change in the input field
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //submit handler for adding product in the database
  const addProductSubmitHandler = (e) => {
    e.preventDefault();
    //post request to add the product in the database
    fetch("http://localhost:8080/productDetails/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error("Failed to add Product!");
        }
      })
      .then(() => {
        alert("Added product successfully!");
        console.log("Product added successfully");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //cancel button
  const cancelButton = (e) => {
    e.preventDefault();
    console.log("Cancelled");
    navigate("/");
  };

  return (
    <div className="add-product">
      <div className="add-product-container">
        <h1>Add Product</h1>
        <form onSubmit={addProductSubmitHandler}>
          <h5>Product Title</h5>
          <input
            type="text"
            name="productTitle"
            onChange={changeHandler}
            required
          />
          <h5>Category</h5>
          <input
            type="text"
            name="category"
            onChange={changeHandler}
            required
          />
          <h5>Price</h5>
          <input type="number" name="price" onChange={changeHandler} required />
          <h5>Image URL</h5>
          <input
            type="text"
            name="imageURL"
            onChange={changeHandler}
            required
          />
          <h5>Rating</h5>
          <input
            type="number"
            name="rating"
            onChange={changeHandler}
            required
          />
          <button type="submit" className="add-product-button">
            Add Product
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
  );
}

export default AddProduct;
