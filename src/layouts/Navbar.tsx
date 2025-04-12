import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="px-8 py-8 bg-green-200 sticky top-0 z-20 shadow-md">
      <div className="max-w-[1700px]  flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-green-700 tracking-wide hover:text-green-500">Home</Link>
        <div className="flex items-center space-x-6 font-semibold">
          <Link to='/register' className="tracking-wide text-green-700 hover:text-green-500">
            Sign up
          </Link>
          <Link to='/login' className="px-8 py-2 tracking-wide bg-green-600 rounded-md text-white hover:bg-green-700 transition-all duration-300">
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar