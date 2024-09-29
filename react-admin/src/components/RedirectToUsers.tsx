import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToUsers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/users');
  }, [navigate]);

  return null;  // Return null because this component doesn't render anything
};

export default RedirectToUsers;
