import React from 'react';

const CartSummary = ({ subtotal, onPayNow }) => {
  return (
    <div className="cart-summary mt-3">
      <h3 className="subtotal">Subtotal: &#8377;{subtotal}</h3>
      <button className="btn btn-success w-100 mt-3" onClick={onPayNow}>Pay Now</button>
    </div>
  );
};

export default CartSummary;
