import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import Product from "./Product";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  //handles change in product details
  const changeHandler = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  //handles removing of product from the database
  const removeButton = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/productDetails/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product removed successfully!");
          console.log("Removed Product");
          navigate("/");
        } else {
          throw new Error("Sorry didn't work!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  //handles the save changes button
  const editProductSubmitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/productDetails/updateProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product updated Successfully!");
          navigate("/");
        } else {
          throw new Error("Sorry didn't work!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  //handles the cancel button
  const cancelButton = (e) => {
    e.preventDefault();
    navigate("/");
  };

  //useEffect to get a particular product detail
  useEffect(() => {
    fetch(`http://localhost:8080/productDetails/getProduct/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="edit-product">
      <div className="edit-product-left">
        <h2 className="edit-product-title">Edit Product</h2>
        <div className="edit-product-form-container">
          <form onSubmit={editProductSubmitHandler}>
            <h5>Product Title</h5>
            <input
              type="text"
              name="productTitle"
              onChange={changeHandler}
              value={productData.productTitle}
              required
            />
            <h5>Price</h5>
            <input
              type="number"
              name="price"
              onChange={changeHandler}
              value={productData.price}
              required
            />
            <h5>Image URL</h5>
            <input
              type="text"
              name="imageURL"
              onChange={changeHandler}
              value={productData.imageURL}
              required
            />
            <h5>Rating</h5>
            <input
              type="number"
              name="rating"
              onChange={changeHandler}
              value={productData.rating}
              required
            />

            <button
              type="submit"
              className="save-button"
              onClick={editProductSubmitHandler}
            >
              Save Changes
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
        <h2 className="edit-product-title">Remove Product</h2>
        <button type="button" className="remove-button" onClick={removeButton}>
          Remove this product
        </button>
      </div>
      <div className="edit-product-right">
        <div>
          <h2 className="edit-product-title">The Product will look like</h2>
        </div>
        <div className="edit-product-column">
          <Product
            id={productData.productId}
            title={productData.productTitle}
            price={productData.price}
            image={productData.imageURL}
            rating={productData.rating}
          />
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
