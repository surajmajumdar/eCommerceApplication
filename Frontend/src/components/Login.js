import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();

  //handles change in the input fields
  const changeHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  //checks the email and password from the database
  const signIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/userDetails/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Email or password incorrect");
        }
      })
      .then((data) => {
        if (data.status === true) {
          console.log("Login successful");
          localStorage.setItem("userId", data.userId);
          navigate("/");
        } else {
          console.error("Login failed");
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  //handles the create new account button
  const createAccount = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  //handles the forgot password button
  const forgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgotpassword");
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="/images/S_Shopping.png"
          alt="S Shops"
          className="login-logo"
        />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form onSubmit={signIn}>
          <h5>E-mail</h5>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={changeHandler}
            required
          />
          <h5>Password</h5>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={changeHandler}
            required
          />
          <button type="submit" className="login-signin-button">
            Sign in
          </button>
          <button
            className="login-forgot-password-button"
            onClick={forgotPassword}
          >
            Forgot Password?
          </button>
        </form>
        <p>
          By signing-in you agree to the Website's condition of Use and Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={createAccount} className="login-register-button">
          Don't have an account? Create now
        </button>
      </div>
    </div>
  );
}

export default Login;
