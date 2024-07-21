import React from "react";
import "./OrderTotal.css";
import CurrencyFormat from "react-currency-format";

function OrderTotal({ totalQuantity, subTotalValue }) {
  //Order Total component
  return (
    <div className="order-total">
      <CurrencyFormat
        renderText={(value) => (
          <p>
            Order Total ({totalQuantity} items):
            <strong> {value}</strong>
          </p>
        )}
        decimalScale={2}
        value={subTotalValue}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default OrderTotal;
