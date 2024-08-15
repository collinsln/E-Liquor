import React from 'react';
import { Button } from '@chakra-ui/react'
function UserPage({ user, onLogout }) {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <h2>Hey there, {user.firstName} {user.lastName}!</h2>
      {'Happy Shopping!'}
      <Button colorScheme='red' onClick={handleLogout}>Logout</Button>
      {/**<button onClick={handleLogout}><br />Logout</button>**/}
    </>
  );
}

export default UserPage;
