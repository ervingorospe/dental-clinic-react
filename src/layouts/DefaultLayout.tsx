import { Outlet } from "react-router-dom";
import Navbar from '@layouts/Navbar'
import Footer from '@layouts/Footer'

const DefaultLayout = () => {
  return (
    <>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default DefaultLayout