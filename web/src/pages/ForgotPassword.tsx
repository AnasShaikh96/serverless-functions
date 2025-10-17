import { createFileRoute } from '@tanstack/react-router';
import React from 'react';


export const Route = createFileRoute('/forgot-password')({
  component: () => <ForgotPassword />,
})


const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Forgot Password</h1>
        <p className="text-gray-600">This is the forgot password page</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
