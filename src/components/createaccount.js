import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context'; // Assuming UserContext is exported from context

export function CreateAccount() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState(''); // New state for account type
  const ctx = useContext(UserContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(field, label) {
    if (!field) {
      setStatus(`Error: ${label} is required`);
      setTimeout(() => setStatus(''), 3000);
      return false;
    }
    return true;
  }

  async function handleCreate() {
    if (!validate(name, 'name')) return;
    if (!validate(email, 'email')) return;
    if (!validate(password, 'password')) return;
    if (!validate(accountType, 'account type')) return; // Validate account type
    if (!emailRegex.test(email)) {
      setStatus('Error: Please enter a valid email address');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if (password.length < 8) {
      setStatus('Error: Password must be at least 8 characters');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    try {
      const response = await axios.post('/api/create-account', {
        name,
        email,
        password,
        accountType, // Include account type in the request
        balance: 1000, // Initial balance
      });

      if (response.data.success) {
        // Assuming the API returns the user object
        ctx.users.push(response.data.user); 
        setStatus('You have created your account');
        setShow(false);
      } else {
        setStatus('Error: Account creation failed');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (err) {
      console.error('Error creating account:', err);
      setStatus('Error: Server error');
      setTimeout(() => setStatus(''), 3000);
    }
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setAccountType(''); // Reset account type
    setStatus('');
    setShow(true);
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-primary text-white text-center">
            Create Account
          </div>
          <div className="card-body">
            {status && (
              <div className="alert alert-danger" role="alert">
                {status}
              </div>
            )}
            {show ? (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="accountType" className="form-label">Account Type</label>
                  <select
                    className="form-select"
                    id="accountType"
                    value={accountType}
                    onChange={e => setAccountType(e.currentTarget.value)}
                  >
                    <option value="">Select account type</option>
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <button type="button" className="btn btn-primary w-100" onClick={handleCreate}>
                  Create Account
                </button>
              </>
            ) : (
              <>
                <h5 className="text-center">Success</h5>
                <button type="button" className="btn btn-secondary w-100" onClick={clearForm}>
                  Add another account
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
