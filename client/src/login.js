import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './context';

function Login() {
  const { setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        setCurrentUser(response.data.user); // Assuming the API returns the user object
        setError(''); // Clear any previous errors
        setSuccess('Login successful!'); // Set success message
        console.log('User logged in:', response.data.user);
      } else {
        setError('Login failed: Invalid credentials');
        setSuccess(''); // Clear any previous success messages
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Login failed: Server error');
      setSuccess(''); // Clear any previous success messages
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>} {/* Display success message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
