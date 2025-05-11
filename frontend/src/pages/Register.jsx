import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { addMember } = useContext(UserContext);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [raw_password, setRawPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Fix: define errors object (empty for now since validation is not implemented)
  const errors = {};

  const handleSubmit = (e) => {
    e.preventDefault();


    addMember(first_name, last_name, username, email, raw_password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
              placeholder="Enter your last name"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your Email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={raw_password}
              onChange={(e) => setRawPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Create a password"
            />
          </div>

          {/* Repeat Password */}
          <div>
            <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-1">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.repeatPassword ? 'border-red-500' : ''}`}
              placeholder="Repeat your password"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
