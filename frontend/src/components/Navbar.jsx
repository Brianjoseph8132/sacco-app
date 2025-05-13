import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BellIcon } from "@heroicons/react/24/outline";
import { AccountContext } from "../context/AccountContext";
import { LoanContext } from "../context/LoanContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { current_user, logout } = useContext(UserContext);
  const { hasAccount } = useContext(AccountContext);
  const {unreadCount} = useContext(LoanContext);

  // Mocked notifications count for demo. Replace this with real notifications count from context or API.
  

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md rounded-b-xl p-4 flex items-center justify-between">
      {/* Logo and Name */}
      <div className="flex items-center space-x-2">
        <img
          src="https://i.pinimg.com/736x/c0/38/06/c038066a2f5259b648e4afb44acaef44.jpg"
          alt="SACCO Logo"
          className="w-8 h-8"
          onError={(e) => (e.target.src = "fallback-logo.png")}
        />
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SACCO
        </Link>
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
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute md:static top-16 right-4 md:flex bg-white md:bg-transparent rounded-xl shadow-md md:shadow-none p-4 md:p-0 space-y-2 md:space-y-0 md:space-x-4`}
      >
        {current_user ? (
          <>
            <NavLink to="/" label="Home" active={isActive("/")} setMenuOpen={setMenuOpen} />
            {!hasAccount && (
              <NavLink to="/account" label="Create Account" active={isActive("/account")} setMenuOpen={setMenuOpen} />
            )}
            {hasAccount && (
              <>
                <NavLink to="/transaction" label="Transaction" active={isActive("/transaction")} setMenuOpen={setMenuOpen} />
                <NavLink to="/appliaction" label="Loan Application" active={isActive("/appliaction")} setMenuOpen={setMenuOpen} />
                <NavLink to="/dashboard" label="Dashboard" active={isActive("/dashboard")} setMenuOpen={setMenuOpen} />
                <NavLink to="/history" label="History" active={isActive("/history")} setMenuOpen={setMenuOpen} />
                <Link
                  to="/notifications"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-center justify-center text-gray-700 hover:text-blue-600"
                >
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            <button
              onClick={logout}
              className="block px-3 py-2 rounded-lg transition text-gray-700 hover:bg-blue-100"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/about" label="About" active={isActive("/about")} setMenuOpen={setMenuOpen} />
            <NavLink to="/contact" label="Contact" active={isActive("/contact")} setMenuOpen={setMenuOpen} />
            <NavLink to="/service" label="Services" active={isActive("/service")} setMenuOpen={setMenuOpen} />
            <NavLink to="/login" label="Login" active={isActive("/login")} setMenuOpen={setMenuOpen} />
            <NavLink to="/register" label="Sign Up" active={isActive("/register")} setMenuOpen={setMenuOpen} />
          </>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, label, active, setMenuOpen, children }) {
  return (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`block px-3 py-2 rounded-lg transition ${
        active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {children || label}
    </Link>
  );
}
