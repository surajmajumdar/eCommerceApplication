import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [userData, setUserData] = useState([]);
  const [passwordData, setPasswordData] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  //handles the input value
  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //handles the password value
  const passwordHandler = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  //checks credentials first to give access to reset password
  const checkCredentials = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/userDetails/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Email or pet name incorrect");
        }
      })
      .then((data) => {
        if (data.status === true) {
          setStatus(true);
          alert("Credentials matched! Please proceed to reset your password.");
        } else {
          console.error("Login failed");
          alert("Email or pet name incorrect. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  //handles the reset password button and makes a put request to change the password
  const resetPassword = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:8080/userDetails/resetPassword/${userData.email}/${passwordData.password}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Password reset Successful!");
          navigate("/login");
        } else {
          throw new Error("Sorry didn't work!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="forgot-password">
      <Link to="/">
        <img
          src="/images/S_Shopping.png"
          alt="S Shops"
          className="forgot-password-logo"
        />
      </Link>
      <div className="forgot-password-container">
        <h1>Reset your Password</h1>
        <form>
          <h5>E-mail</h5>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={changeHandler}
            required
          />
          {!status && (
            <>
              <h5>Pet name you entered while registering your account</h5>
              <input
                name="petName"
                type="text"
                placeholder="Enter your pet name"
                onChange={changeHandler}
                required
              />

              <button
                type="submit"
                onClick={checkCredentials}
                className="check-credentials-button"
              >
                Check credentials
              </button>
            </>
          )}
          {status && (
            <>
              <h5>Enter new password</h5>
              <input
                name="password"
                type="password"
                placeholder="Enter new password"
                onChange={passwordHandler}
                required
              />
              <button
                type="submit"
                onClick={resetPassword}
                className="reset-password-button"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
