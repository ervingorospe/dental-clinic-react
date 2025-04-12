import Sidebar from '@layouts/Sidebar';
import { Outlet } from "react-router-dom";
import DashboardNavbar from '@layouts/DashboardNavbar'

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <DashboardNavbar/>
        <Outlet/>
      </div>
    </>
  )
};

export default DashboardLayout;