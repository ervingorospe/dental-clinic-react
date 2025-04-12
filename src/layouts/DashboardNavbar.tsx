import { useAuth } from '@context/AuthContext';

const DashboardNavbar = () => {
  const { user } = useAuth()

  return (
    <nav className="px-8 py-6 shadow-md">
      <div className="max-w-[1700px]  flex justify-end items-center">
        <div className="flex items-center space-x-6 font-semibold">
          <p className="tracking-wide text-green-700 hover:text-green-500">
            Welcome { user.firstName } { user.lastName }
          </p>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar