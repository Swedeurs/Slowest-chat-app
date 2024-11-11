"use client";
import React, { useState } from 'react';
import LoginForm from './login-form';


const HomePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUsername(username);
  };

  return (
    <div>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default HomePage;
