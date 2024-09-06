import React, { useState } from 'react';

function Deposit() {
  const [balance, setBalance] = useState(1000); // Initial balance
  const [depositAmount, setDepositAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setDepositAmount(value);
    setButtonDisabled(value === ''); // Enable/disable the button
    setMessage(''); // Clear previous messages
  };

  // Handle deposit form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const amount = parseFloat(depositAmount);

    if (isNaN(amount)) {
      setMessage('Please enter a valid number for the deposit amount.');
    } else if (amount <= 0) {
      setMessage('Please enter a positive number for the deposit amount.');
    } else {
      setBalance(balance + amount); // Update balance
      setMessage(`Deposit successful! Your new balance is $${(balance + amount).toFixed(2)}.`);
      setDepositAmount(''); // Clear input field
      setButtonDisabled(true); // Disable button again
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            Deposit
          </div>
          <div className="card-body">
            {message && <div className="alert alert-info" role="alert">{message}</div>}
            <h5>Current Balance: ${balance.toFixed(2)}</h5>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="depositAmount">Deposit Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="depositAmount"
                  placeholder="Enter deposit amount"
                  value={depositAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={isButtonDisabled}>
                Deposit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
