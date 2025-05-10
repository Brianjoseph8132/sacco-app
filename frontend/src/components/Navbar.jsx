import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md rounded-b-xl p-4 flex items-center justify-between">
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <img
          src="https://i.pinimg.com/736x/c0/38/06/c038066a2f5259b648e4afb44acaef44.jpg"
          alt="SACCO Logo"
          className="w-8 h-8"
          onError={(e) => e.target.src = 'fallback-logo.png'} // Fallback image
        />
        <Link to="/" className="text-2xl font-bold text-blue-600">SACCO</Link>
      </div>

      {/* Toggle Button */}
      <button
        aria-expanded={menuOpen ? "true" : "false"}
        className="text-gray-700 md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Links */}
      <div className={`${menuOpen ? "block" : "hidden"} absolute md:static top-16 right-4 md:flex bg-white md:bg-transparent rounded-xl shadow-md md:shadow-none p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-4`}>
        <Link 
          to="/" 
          onClick={() => setMenuOpen(false)} 
          className={`block px-3 py-2 rounded-lg transition ${isActive("/") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          onClick={() => setMenuOpen(false)} 
          className={`block px-3 py-2 rounded-lg transition ${isActive("/about") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
        </Link>
        <Link 
          to="/service" 
          onClick={() => setMenuOpen(false)} 
          className={`block px-3 py-2 rounded-lg transition ${isActive("/services") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
          aria-current={isActive("/services") ? "page" : undefined}
        >
          Services
        </Link>
        <Link 
          to="/account" 
          onClick={() => setMenuOpen(false)} 
          className={`block px-3 py-2 rounded-lg transition ${isActive("/services") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
          aria-current={isActive("/services") ? "page" : undefined}
        >
          Create Account
        </Link>
        <Link 
              to="/repayment" 
              onClick={() => setMenuOpen(false)} 
              className={`block px-3 py-2 rounded-lg transition ${isActive("/loan-application") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
              aria-current={isActive("/repayment") ? "page" : undefined}
            >
              Repayment
        </Link>
        <Link 
              to="/dashboard" 
              onClick={() => setMenuOpen(false)} 
              className={`block px-3 py-2 rounded-lg transition ${isActive("/dashboard") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              Dashboard
        </Link>
        
        {isLoggedIn ? (
          <> 
            <Link 
              to="/transaction" 
              onClick={() => setMenuOpen(false)} 
              className={`block px-3 py-2 rounded-lg transition ${isActive("/loan-application") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
              aria-current={isActive("/transaction") ? "page" : undefined}
            >
              Transaction
            </Link>
            <Link 
              to="/loanappliaction" 
              onClick={() => setMenuOpen(false)} 
              className={`block px-3 py-2 rounded-lg transition ${isActive("/loan-application") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
              aria-current={isActive("/loanappliaction") ? "page" : undefined}
            >
              Loan Application
            </Link>
            
            
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              onClick={() => setMenuOpen(false)} 
              className={`block px-3 py-2 rounded-lg transition ${isActive("/login") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
              aria-current={isActive("/login") ? "page" : undefined}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              onClick={() => setMenuOpen(false)} 
              className={`block px-3 py-2 rounded-lg transition ${isActive("/register") ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`}
              aria-current={isActive("/register") ? "page" : undefined}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
