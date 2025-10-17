import { createFileRoute } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/reset-password')({
  component: () => <ResetPassword />,
})



const ResetPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Reset Password</h1>
        <p className="text-gray-600">This is the reset password page</p>
      </div>
    </div>
  );
};

export default ResetPassword;
