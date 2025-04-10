import React, { ReactNode } from 'react';
import Sidebar from '@layouts/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        {/* <Navbar /> */}
        {children}
      </div>
    </>
  )
};

export default DashboardLayout;