const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://your-app-name.herokuapp.com'
  : 'http://localhost:5000';

//transfer.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './context';

function Transfer() {
    const { currentUser } = useContext(UserContext);
    const [recipientId, setRecipientId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleTransfer = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/transfer`, {
                senderId: currentUser._id, // Accessing currentUser from context
                recipientId,
                amount: parseFloat(amount),
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Transfer failed');
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Transfer Money</h5>
                <input
                    type="text"
                    placeholder="Recipient ID"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="form-control"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-control"
                />
                <button onClick={handleTransfer} className="btn btn-primary mt-3">
                    Transfer
                </button>
                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
}

export default Transfer;
