import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";

function Subtotal({ totalQuantity, subTotalValue }) {
  const navigate = useNavigate();

  //handles the proceed to checkout button
  const proceedToCheckout = (e) => {
    e.preventDefault();
    if (subTotalValue > 0)
      navigate(
        `/order?totalQuantity=${totalQuantity}&subTotalValue=${subTotalValue}`
      );
    else alert("Please add some products to the basket first!");
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({totalQuantity} items):
              <strong> {value}</strong>
            </p>
            <small className="subtotal-gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={subTotalValue}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick={proceedToCheckout}>Proceed to checkout</button>
    </div>
  );
}

export default Subtotal;
