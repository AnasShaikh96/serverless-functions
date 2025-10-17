import { createFileRoute } from '@tanstack/react-router';
import React from 'react';



export const Route = createFileRoute('/login')({
  component: () => <Login />,
})


const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Login</h1>
        <p className="text-gray-600">This is the login page</p>
      </div>
    </div>
  );
};

export default Login;
