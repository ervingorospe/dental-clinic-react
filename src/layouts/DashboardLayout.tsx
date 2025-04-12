import Sidebar from '@layouts/Sidebar';
import { Outlet } from "react-router-dom";
import Footer from '@layouts/footer'
import DashboardNavbar from '@layouts/DashboardNavbar'

const DashboardLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64">
        <DashboardNavbar/>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
};

export default DashboardLayout;