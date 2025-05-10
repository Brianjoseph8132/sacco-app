import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Required field check
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    // Password match check
    if (formData.password && formData.repeatPassword && formData.password !== formData.repeatPassword) {
      validationErrors.repeatPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    // If no errors, proceed (e.g., send formData to API)
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted", formData);
      // Reset form if needed
    }
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
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : ''}`}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Choose a username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Create a password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Repeat Password */}
          <div>
            <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-1">Repeat Password</label>
            <input
              type="password"
              id="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.repeatPassword ? 'border-red-500' : ''}`}
              placeholder="Repeat your password"
            />
            {errors.repeatPassword && <p className="text-red-500 text-sm mt-1">{errors.repeatPassword}</p>}
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
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
