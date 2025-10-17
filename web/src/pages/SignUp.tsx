import { createFileRoute } from '@tanstack/react-router';
import React from 'react';


export const Route = createFileRoute('/sign-up')({
  component: () => <SignUp />,
})


const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign Up</h1>
        <p className="text-gray-600">This is the sign up page</p>
      </div>
    </div>
  );
};

export default SignUp;
