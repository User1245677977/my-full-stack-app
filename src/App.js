import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import { CreateAccount } from './components/createaccount';
import Login from './login';
import Deposit from './deposit.js'; // Or: import Deposit from './deposit';
import { Withdraw } from './withdraw';
import AllData from './alldata';
import { Home } from './home';
import { UserProvider } from './context';  // Remove UserContext since it's not used
import { Balance } from './balance';
import Transfer from './transfer';
import UpdateProfile from './components/UpdateProfile.js';
import ProfilePage from './pages/ProfilePage';
import CheckDeposit from './checkdeposit'; // Keep this if necessary

function App() {
  return (
    <UserProvider>  {/* Wrap the application with UserProvider */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/deposit" element={<Deposit />} /> 
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/all-data" element={<AllData />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/check-deposit" element={<CheckDeposit />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
