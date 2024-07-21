import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  const [productList, setProductList] = useState([]);

  //fetch all the product details
  useEffect(() => {
    fetch("http://localhost:8080/productDetails/getAllProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product List fetched in Home");
        setProductList(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <img src="/images/EcommerceBackground.png" className="home-image" />
        <div className="home-row">
          {productList.slice(0, 2).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(2, 5).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(5, 7).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(7, 10).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(10, 12).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(12, 15).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(15, 17).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(17, 20).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="home-row">
          {productList.slice(20, 22).map((product) => (
            <Product
              key={product.productId}
              id={product.productId}
              title={product.productTitle}
              price={product.price}
              image={product.imageURL}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
