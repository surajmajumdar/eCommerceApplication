import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [data, setData] = useState({
    accountType: "customer",
    firstName: "",
    lastName: "",
    mobileNo: "",
    dob: "",
    email: "",
    password: "",
    petName: "",
  });
  const navigate = useNavigate();

  //handles change in input fields
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //handles the submit button and if the details entered are correct, saves the user in the database
  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/userDetails/addUser", {
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
          throw new Error("Failed to create account!");
        }
      })
      .then(() => {
        alert("Created account successfully!");
        console.log("Account created");
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signup">
      <Link to="/">
        <img
          src="/images/S_Shopping.png"
          alt="S Shops"
          className="signup-logo"
        />
      </Link>
      <div className="signup-container">
        <h1>Create your Account</h1>
        <form onSubmit={signUpSubmitHandler}>
          <h5>Account Type</h5>
          <select
            name="accountType"
            value={data.accountType}
            onChange={changeHandler}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <h5>First Name</h5>
          <input
            type="text"
            name="firstName"
            onChange={changeHandler}
            required
          />
          <h5>Last Name</h5>
          <input
            type="text"
            name="lastName"
            onChange={changeHandler}
            required
          />
          <h5>Mobile No.</h5>
          <input
            type="text"
            name="mobileNo"
            onChange={changeHandler}
            required
          />
          <h5>Date of birth</h5>
          <input type="date" name="dob" onChange={changeHandler} required />
          <h5>E-mail</h5>
          <input type="email" name="email" onChange={changeHandler} required />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            required
          />
          <h5>Pet Name (incase you forget your password)</h5>
          <input type="text" name="petName" onChange={changeHandler} required />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
