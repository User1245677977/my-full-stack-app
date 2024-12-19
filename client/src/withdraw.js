import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './context';

export function Withdraw() {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [balance, setBalance] = useState(0);
  const [accountType, setAccountType] = useState(''); // New state for account type
  const ctx = useContext(UserContext);

  useEffect(() => {
    // Fetch the current balance and account type from the API when the component mounts
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(`/api/account/${ctx.users[0]._id}`); // Assuming the user has an ID
        setBalance(response.data.balance);
        setAccountType(response.data.accountType); // Set the account type
      } catch (err) {
        console.error('Error fetching account details:', err);
      }
    };

    fetchAccountDetails();
  }, [ctx.users]);

  const validate = (field, label) => {
    if (!field) {
      setStatus(`Error: ${label} is required`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  };

  const handleWithdraw = async (event) => {
    event.preventDefault();

    if (!validate(amount, 'amount')) return;

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setStatus('Error: Enter a valid positive number');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if (numAmount > balance) {
      setStatus('Error: Insufficient balance');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    // Check against account-specific withdrawal limits
    if (accountType === 'Basic' && numAmount > 500) {
      setStatus('Error: Basic accounts have a withdrawal limit of $500 per transaction');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if (accountType === 'Premium' && numAmount > 1000) {
      setStatus('Error: Premium accounts have a withdrawal limit of $1000 per transaction');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    // Add additional checks as needed for other account types

    try {
      const response = await axios.post('/api/withdraw', {
        userId: ctx.users[0]._id, // Assuming the user has an ID
        amount: numAmount,
      });

      if (response.data.success) {
        const newBalance = response.data.newBalance;
        setBalance(newBalance);
        setStatus(`Withdrawal successful! Your new balance is $${newBalance.toFixed(2)}`);
      } else {
        setStatus(`Error: ${response.data.message}`);
      }
    } catch (err) {
      console.error('Error processing withdrawal:', err);
      setStatus('Error: Server error');
      setTimeout(() => setStatus(''), 3000);
    }

    setAmount('');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            Withdraw
          </div>
          <div className="card-body">
            {status && (
              <div className="alert alert-info" role="alert">
                {status}
              </div>
            )}
            <h5>Account Type: {accountType}</h5> {/* Display account type */}
            <h5>Current Balance: ${balance.toFixed(2)}</h5>
            <form onSubmit={handleWithdraw}>
              <div className="mb-3">
                <label htmlFor="withdrawAmount" className="form-label">Withdraw Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="withdrawAmount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Withdraw
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
