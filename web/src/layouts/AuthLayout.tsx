import React from 'react';
import { Outlet } from '@tanstack/react-router';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
