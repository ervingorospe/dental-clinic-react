import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-green-300 py-6">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600">
        {/* Left: Home Link */}
        <Link to="/" className="text-xl font-bold hover:underline">Home</Link>

        {/* Center: Copyright */}
        <p className="text-center flex-1">© {new Date().getFullYear()} All rights reserved.</p>

        {/* Right: Name */}
        <span className="text-right font-bold text-xl">Ervn Gorospe</span>
      </div>
    </footer>
  )
}

export default Footer;