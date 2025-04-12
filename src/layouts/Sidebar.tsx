import React from 'react'
import { useLocation } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const mainMenu = [
  {
    title: 'Dashboard',
    icon: 'fa-solid fa-table-columns',
    route: '/'
  },
  {
    title: 'Appointments',
    icon: 'fa-solid fa-calendar-check',
    route: '/appointments'
  },
  {
    title: 'Profile',
    icon: 'fa-solid fa-user',
    route: '/profile'
  }
]

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    if (await logout()) {
      navigate("/")
    }
  };

  return (
    <>
      <nav className="relative z-10 flex w-full items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:top-0 md:bottom-0 md:left-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">

          <button
            className="text-gray-800 cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>

          <Link
            to="/"
            className="lg:mt-8 text-gray-800 mr-0 inline-block text-left text-2xl font-bold whitespace-nowrap md:block"
          >
            Dental Clinic
          </Link>
          <div
            className={
              'absolute top-0 right-0 left-0 z-40 h-auto flex-1 items-center overflow-x-hidden overflow-y-auto rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none ' +
              collapseShow
            }
          >
            <div className="block md:hidden md:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    to="/"
                    className="text-gray-800 mr-0 inline-block px-0 text-left text-sm font-bold whitespace-nowrap md:block"
                  >
                    Dental Clinic
                  </Link>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            <hr className="w-full border-gray-600"/>

            {
              user.role !== 'doctor' && (
                <div className="mt-8 lg:mt-6">
                  <Link to="/booking" className="bg-green-600 rounded-md hover:bg-green-700 text-white px-4 py-2 text-center">
                    Set an Appointment
                  </Link>
                </div>
              )
            }

            <ul className="mt-4 lg:mt-6 flex list-none flex-col md:min-w-full md:flex-col">
              {mainMenu?.map((menu: any) => (
                <li className="items-center border-b last:border-0 border-gray-300" key={menu.title}>
                  <Link
                    to={menu.route}
                    className={`block py-3 font-semibold tracking-wide ${location.pathname === menu.route ? 'text-green-600' : 'text-gray-600'} hover:text-green-600`}
                  >
                    <i className={`${menu.icon} mr-2`}></i> {menu.title}
                  </Link>
                </li>
              ))}
            </ul>

            <hr className="my-6 w-full border-gray-600"/>
            <button onClick={() => handleLogout()} className="rounded-full cursor-pointer items-center text-left text-gray-600 hover:text-green-600 transition-all duration-300">
              <i className="fa-solid fa-right-from-bracket mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar