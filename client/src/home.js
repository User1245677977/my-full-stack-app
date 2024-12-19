import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bankImage from './assets/images/bank.png';

export function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState('');  // State to store the welcome message

  useEffect(() => {
    // Fetch the welcome message from the API when the component mounts
    const fetchWelcomeMessage = async () => {
      try {
        const response = await axios.get('/api/welcome-message');  // Replace with your API endpoint
        setWelcomeMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching welcome message:', error);
        setWelcomeMessage('Welcome to the bank!');  // Fallback message
      }
    };

    fetchWelcomeMessage();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <div className="card-header text-center">
            <h4 className="card-title mb-0">FrontEndBank</h4>
          </div>
          <div className="card-body text-center">
            <h5 className="card-subtitle mb-3 text-muted">{welcomeMessage}</h5>  {/* Displaying the welcome message */}
            <p className="card-text">You can move around using the navigation bar.</p>
            <img 
              src={bankImage} 
              className="img-fluid mb-3" 
              alt="A bank building" 
              style={{ maxHeight: '150px', objectFit: 'contain' }} 
            />
          </div>
          <div className="card-footer text-center text-muted">
            Thank you for visiting
          </div>
        </div>
      </div>
    </div>
  );
}
