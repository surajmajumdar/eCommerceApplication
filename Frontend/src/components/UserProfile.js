import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    dob: "",
    email: "",
    password: "",
    petName: "",
  });

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  //handles the change in input fields
  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //handles the submit button and updates the user details in the database
  const userProfileSubmitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/userDetails/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Profile updated Successfully!");
          navigate("/");
        } else {
          throw new Error("Sorry didn't work!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  //useEffect to fetch a particular user details
  useEffect(() => {
    fetch(`http://localhost:8080/userDetails/getUser/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User Profile fetched");
        setUserData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [userId]);

  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <h1>Edit your Profile</h1>
        <form onSubmit={userProfileSubmitHandler}>
          <h5>Account Type</h5>
          <select
            name="accountType"
            onChange={changeHandler}
            value={userData.accountType}
          >
            <option name="admin" value="admin">
              Admin
            </option>
            <option name="customer" value="customer">
              Customer
            </option>
          </select>
          <h5>First Name</h5>
          <input
            type="text"
            name="firstName"
            onChange={changeHandler}
            value={userData.firstName}
          />
          <h5>Last Name</h5>
          <input
            type="text"
            name="lastName"
            onChange={changeHandler}
            value={userData.lastName}
          />
          <h5>Mobile No.</h5>
          <input
            type="text"
            name="mobileNo"
            onChange={changeHandler}
            value={userData.mobileNo}
          />
          <h5>Date of birth</h5>
          <input
            type="date"
            name="dob"
            onChange={changeHandler}
            value={userData.dob}
          />
          <h5>E-mail</h5>
          <input
            type="email"
            name="email"
            onChange={changeHandler}
            value={userData.email}
          />
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            value={userData.password}
          />
          <h5>Pet Name (incase you forget your password)</h5>
          <input
            type="text"
            name="petName"
            onChange={changeHandler}
            value={userData.petName}
          />
          <button type="submit" className="save-changes-button">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
