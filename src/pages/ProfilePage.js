// src/pages/ProfilePage.js
import React from 'react';
import UpdateProfile from '../components/UpdateProfile';

const ProfilePage = ({ user }) => {
   return (
      <div>
         <h1>My Profile</h1>
         <UpdateProfile user={user} />
      </div>
   );
};

export default ProfilePage;