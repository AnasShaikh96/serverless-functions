import React from 'react';
import { ThemeProvider } from '../components/theme-provider';
import { SidebarProvider } from '../components/sidebar-context';
import { Navbar01 } from '../components/navbar';
import { DashboardLayout } from '../components/dashboard-layout';

const DashboardLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SidebarProvider>
        <Navbar01 />
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayoutWrapper;
