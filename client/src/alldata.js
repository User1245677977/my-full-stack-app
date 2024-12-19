import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from './context';

function AllData() {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(`/api/user-data/${currentUser._id}`); // Fetch user data from API
          setUserData(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="container">
      <h1 className="mt-5 mb-4 text-center">User Data Overview</h1>
      <div id="userSubmissions">
        {userData ? (
          <>
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                User Information
              </div>
              <div className="card-body">
                <h5 className="card-title">{userData.name || "N/A"}</h5>
                <p className="card-text"><strong>Email:</strong> {userData.email || "N/A"}</p>
                <p className="card-text"><strong>Password:</strong> {userData.password || "N/A"}</p>
                <p className="card-text"><strong>Balance:</strong> ${userData.balance?.toFixed(2) ?? "0.00"}</p>
              </div>
            </div>

            <div className="card">
              <div className="card-header bg-primary text-white">
                Transaction History
              </div>
              <div className="card-body">
                {userData.transactions && userData.transactions.length > 0 ? (
                  <ul className="list-group">
                    {userData.transactions.map((transaction, index) => (
                      <li key={index} className="list-group-item">
                        <p><strong>Type:</strong> {transaction.type}</p>
                        <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No transactions found.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="alert alert-warning" role="alert">
            No user is currently signed in.
          </div>
        )}
      </div>
    </div>
  );
}

export default AllData;
