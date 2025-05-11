import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {

  const {login} = useContext(UserContext);


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password)
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>

        {/* Email */}
        <form
         onSubmit={handleSubmit} 
         className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email"
              value={email} 
              id="email" 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your password"
            />
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              className="mr-2"
            />
            <label htmlFor="remember" className="text-gray-700 text-sm">Remember Me</label>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Call to Action */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
