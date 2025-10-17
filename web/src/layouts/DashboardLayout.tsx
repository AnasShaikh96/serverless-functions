import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { ThemeProvider } from '../components/theme-provider';
import { SidebarProvider } from '../components/sidebar-context';
import { Navbar01 } from '../components/navbar';
import { DashboardLayout } from '../components/dashboard-layout';

const DashboardLayoutWrapper: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <Navbar01 />
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayoutWrapper;
