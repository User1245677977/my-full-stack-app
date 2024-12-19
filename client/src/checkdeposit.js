// Import statements should be at the top
import React, { useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from "./context";

// Set the API URL based on environment
const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-app-name.herokuapp.com'
  : 'http://localhost:5000';

// Client-side CheckDeposit component
function CheckDeposit() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const ctx = useContext(UserContext);
  const user = ctx.users[0];

  function validate(field, label) {
    if (!field) {
      setStatus(`Error: ${label}`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  function checkAccountLimits(amount) {
    const accountType = user.accountType; // Assuming accountType is stored in user context

    if (transactionType === 'withdraw') {
      if (amount > user.balance) {
        setStatus('Error: Insufficient funds');
        return false;
      }

      if (accountType === 'savings' && amount > 1000) {
        setStatus('Error: Savings account withdrawal limit is $1000');
        return false;
      }

      if (accountType === 'business' && amount > 5000) {
        setStatus('Error: Business account withdrawal limit is $5000');
        return false;
      }
    } else if (transactionType === 'deposit') {
      if (accountType === 'savings' && amount < 100) {
        setStatus('Error: Minimum deposit for savings account is $100');
        return false;
      }
    }

    return true;
  }

  async function handleTransaction() {
    if (!validate(amount, 'amount')) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setStatus('Error: Enter a valid number');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if (numAmount <= 0) {
      setStatus('Error: Enter a positive number');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if (!checkAccountLimits(numAmount)) return;

    try {
      const response = await axios.post(`${apiUrl}/api/transaction`, {
        type: transactionType,
        amount: numAmount,
        userId: user._id,
      });

      if (response.data.success) {
        user.balance = response.data.newBalance;
        setStatus(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful! New balance is $${response.data.newBalance.toFixed(2)}`);
      } else {
        setStatus(`Error: ${response.data.message}`);
      }
    } catch (err) {
      console.error('Error processing transaction:', err);
      setStatus('Error: Server error');
      setTimeout(() => setStatus(''), 3000);
    }

    setAmount('');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            Deposit/Withdraw
          </div>
          <div className="card-body">
            {status && (
              <div className="alert alert-info" role="alert">
                {status}
              </div>
            )}
            <h5>Current Balance: ${user.balance.toFixed(2)}</h5>
            <h6>Account Type: {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="transactionType"
                id="deposit"
                value="deposit"
                checked={transactionType === 'deposit'}
                onChange={() => setTransactionType('deposit')}
              />
              <label className="form-check-label" htmlFor="deposit">
                Deposit
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="transactionType"
                id="withdraw"
                value="withdraw"
                checked={transactionType === 'withdraw'}
                onChange={() => setTransactionType('withdraw')}
              />
              <label className="form-check-label" htmlFor="withdraw">
                Withdraw
              </label>
            </div>
            <br /><br />
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.currentTarget.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" onClick={handleTransaction}>
              {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckDeposit;
