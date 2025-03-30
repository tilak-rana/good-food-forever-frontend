import React, { useState } from 'react';

const PaymentCard = ({ onPaymentMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onPaymentMethodSelect(method);
  };

  return (
    <div className="payment-card">
      <div className="row">
        <div className="col-12">
          <h4>Select Payment Method</h4>
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${selectedMethod === 'Credit Card' ? 'active' : ''}`}
              onClick={() => handleMethodChange('Credit Card')}
            >
              Credit Card
            </button>
            <button
              className={`list-group-item list-group-item-action ${selectedMethod === 'Debit Card' ? 'active' : ''}`}
              onClick={() => handleMethodChange('Debit Card')}
            >
              Debit Card
            </button>
            <button
              className={`list-group-item list-group-item-action ${selectedMethod === 'PayPal' ? 'active' : ''}`}
              onClick={() => handleMethodChange('PayPal')}
            >
              PayPal
            </button>
            <button
              className={`list-group-item list-group-item-action ${selectedMethod === 'Cash' ? 'active' : ''}`}
              onClick={() => handleMethodChange('Cash')}
            >
              Cash
            </button>
            <button
              className={`list-group-item list-group-item-action ${selectedMethod === 'UPI' ? 'active' : ''}`}
              onClick={() => handleMethodChange('UPI')}
            >
              UPI
            </button>
          </div>
        </div>
        <div className="col-md-8 details">
          {selectedMethod === 'Credit Card' && (
            <div>
              <h4>Enter Your Card Details</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-control" placeholder="Enter card number" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input type="text" className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input type="text" className="form-control" placeholder="CVV" />
                  </div>
                </div>
                <button className="btn btn-success">Submit Payment</button>
              </form>
            </div>
          )}
          {selectedMethod === 'Debit Card' && (
            <div>
              <h4>Enter Your Card Details</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-control" placeholder="Enter card number" />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input type="text" className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CVV</label>
                    <input type="text" className="form-control" placeholder="CVV" />
                  </div>
                </div>
                <button className="btn btn-success">Submit Payment</button>
              </form>
            </div>
          )}
          {selectedMethod === 'PayPal' && (
            <div>
              <h4>PayPal Payment</h4>
              <p>Redirecting to PayPal...</p>
              {/* You can add PayPal integration here */}
            </div>
          )}
          {selectedMethod === 'Cash' && (
            <div>
              <h4>Cash Payment</h4>
              <p>Thank you for choosing cash payment. Please have the cash ready when the delivery arrives.</p>
            </div>
          )}
          {selectedMethod === 'UPI' && (
            <div>
              <h4>Enter UPI Payment Details</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">UPI ID</label>
                  <input type="text" className="form-control" placeholder="Enter your UPI ID" />
                </div>
                <button className="btn btn-success">Submit Payment</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
