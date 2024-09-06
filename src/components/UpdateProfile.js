import axios from 'axios';
import React, { useState } from 'react';

const UpdateProfile = ({ user }) => {
   const [name, setName] = useState(user.name);
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   const handleUpdate = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };

         // Removed the unused 'data' variable
         await axios.put('/api/user/profile', { name, password }, config);

         setMessage('Profile updated successfully');
      } catch (error) {
         setMessage('Error updating profile');
      }
   };

   return (
      <div>
         <h2>Update Profile</h2>
         <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button onClick={handleUpdate}>Update</button>
         {message && <p>{message}</p>}
      </div>
   );
};

export default UpdateProfile;
