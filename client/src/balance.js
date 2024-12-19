import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from './context';
import { Card } from './context';

export function Balance() {
  const ctx = useContext(UserContext);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch the current balance from the API when the component mounts
    const fetchBalance = async () => {
      if (ctx.users && ctx.users.length > 0 && ctx.users[0]._id) {
        try {
          const response = await axios.get(`/api/balance/${ctx.users[0]._id}`); // Assuming the user has an ID
          setBalance(response.data.balance);
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      } else {
        console.error("No user available to fetch balance");
      }
    };

    fetchBalance();
  }, [ctx.users]);

  return (
    <Card
      bgcolor="info"
      header="Account Balance"
      body={
        <>
          <h5>Balance</h5>
          <p>{`$${balance.toFixed(2)}`}</p>
        </>
      }
    />
  );
}
