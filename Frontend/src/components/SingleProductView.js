import React, { useEffect, useState } from "react";
import "./SingleProductView.css";
import Product from "./Product";
import { useParams } from "react-router-dom";

function SingleProductView() {
  const { productId } = useParams();
  const [productData, setProductData] = useState([]);

  //useEffect to fetch a single product details
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
        console.log("Single Product View");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="single-product-view">
      <div className="product">
        <Product
          id={productId}
          title={productData.productTitle}
          price={productData.price}
          image={productData.imageURL}
          rating={productData.rating}
        />
      </div>
      <div className="review">
        <h2>Reviews</h2>
        <p>
          <strong>Suraj:</strong> One of the best products available in the
          market!
        </p>
        <p>
          <strong>Vikas:</strong> Delivery was on time and the packaging is also
          nice!
        </p>
        <p>
          <strong>Gaurav:</strong> Such a good service, love it!
        </p>
        <p>
          <strong>Kartik:</strong> Must buy!
        </p>
        <p>
          <strong>Abhishek:</strong> Value for money!
        </p>
      </div>
    </div>
  );
}

export default SingleProductView;
