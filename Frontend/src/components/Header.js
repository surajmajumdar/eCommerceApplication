import "./Header.css";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";

function Header() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userDetails, setUserDetails] = useState([]);

  //removes the user from local storage when the user logs out
  const removeUser = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    window.location.href = "/";
  };

  //useEffect to get user details based on the user id
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

  return (
    <div className="header">
      <Link to="/">
        <img
          src="/images/S_Shopping.png"
          alt="S Shops"
          className="header-logo"
        />
      </Link>

      <div className="header-search">
        <input
          className="header-search-input"
          type="text"
          placeholder="Search for laptops, mobiles, monitors and more..."
        />
        <SearchIcon className="header-search-icon" />
      </div>

      <div className="header-nav">
        {userId <= 0 ? (
          <Link to="/login">
            <div className="header-option">
              <span className="header-option-line-one">Hello Guest</span>
              <span className="header-option-line-two">Sign In</span>
            </div>
          </Link>
        ) : (
          <Link onClick={removeUser}>
            <div className="header-option">
              <span className="header-option-line-one">
                Hello {userDetails.firstName}
              </span>
              <span className="header-option-line-two">Log Out</span>
            </div>
          </Link>
        )}

        {userDetails.accountType === "admin" && (
          <Link to="/addproduct">
            <div className="header-option">
              <span className="header-option-line-one">Add</span>
              <span className="header-option-line-two">Product</span>
            </div>
          </Link>
        )}

        <Link to="/category">
          <div className="header-option">
            <span className="header-option-line-one">Shop by</span>
            <span className="header-option-line-two">Category</span>
          </div>
        </Link>

        <Link to={userId <= 0 ? "/login" : "/orderhistory"}>
          <div
            className="header-option"
            onClick={() => {
              if (userId <= 0) {
                window.alert("Please login first");
              }
            }}
          >
            <span className="header-option-line-one">Order</span>
            <span className="header-option-line-two">History</span>
          </div>
        </Link>

        <Link to={userId <= 0 ? "/login" : "/userProfile"}>
          <div
            className="header-option"
            onClick={() => {
              if (userId <= 0) {
                window.alert("Please login first");
              }
            }}
          >
            <span className="header-option-line-one">Your</span>
            <span className="header-option-line-two">Profile</span>
          </div>
        </Link>

        <Link to={userId <= 0 ? "/login" : "/checkout"}>
          <div
            className="header-option-basket"
            onClick={() => {
              if (userId <= 0) {
                window.alert("Please login first");
              }
            }}
          >
            <ShoppingBasketIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
