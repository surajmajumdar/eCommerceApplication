import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import Category from "./components/Category";
import OrderHistory from "./components/OrderHistory";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ForgotPassword from "./components/ForgotPassword";
import Order from "./components/Order";
import OrderPlaced from "./components/OrderPlaced";
import SingleProductView from "./components/SingleProductView";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/userProfile"
            element={[
              <Header key="header" />,
              <UserProfile key="userProfile" />,
            ]}
          />
          <Route path="/signup" element={[<Signup key="signup" />]} />
          <Route path="/login" element={[<Login key="login" />]} />
          <Route
            path="/forgotpassword"
            element={[<ForgotPassword key="forgotPassword" />]}
          />
          <Route
            path="/category"
            element={[<Header key="header" />, <Category key="category" />]}
          />
          <Route
            path="/addproduct"
            element={[<Header key="header" />, <AddProduct key="addProduct" />]}
          />
          <Route
            path="/editproduct/:productId"
            element={[
              <Header key="header" />,
              <EditProduct key="editProduct" />,
            ]}
          />
          <Route
            path="/singleproductview/:productId"
            element={[
              <Header key="header" />,
              <SingleProductView key="singleProductView" />,
            ]}
          />

          <Route
            path="/orderhistory"
            element={[
              <Header key="header" />,
              <OrderHistory key="orderHistory" />,
            ]}
          />
          <Route
            path="/order"
            element={[<Header key="header" />, <Order key="order" />]}
          />
          <Route
            path="/orderplaced"
            element={[
              <Header key="header" />,
              <OrderPlaced key="orderPlaced" />,
            ]}
          />

          <Route
            path="/checkout"
            element={[<Header key="header" />, <Checkout key="checkout" />]}
          />
          <Route
            path="/"
            element={[<Header key="header" />, <Home key="home" />]}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
