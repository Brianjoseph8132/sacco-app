import React, { useState } from "react";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    idNumber: "",
    occupation: "",
    initialDeposit: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    // Check required fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    // Phone validation
    if (formData.phoneNumber && !/^\d{7,15}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Enter a valid phone number";
    }

    // ID number validation
    if (formData.idNumber && !/^\d+$/.test(formData.idNumber)) {
      validationErrors.idNumber = "ID must be a valid number";
    }

    // Initial deposit validation
    if (formData.initialDeposit && isNaN(formData.initialDeposit)) {
      validationErrors.initialDeposit = "Deposit must be a valid number";
    }

    // PIN validation (numeric and 4-6 digits)
    if (formData.pin && !/^\d{4,6}$/.test(formData.pin)) {
      validationErrors.pin = "PIN must be 4 to 6 digits";
    }

    setErrors(validationErrors);

    // If no errors, proceed
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted", formData);
      // Reset form or call API
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your SACCO Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          {/* ID Number */}
          <div>
            <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-1">ID Number</label>
            <input
              type="text"
              id="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.idNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your ID number"
            />
            {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
          </div>

          {/* Occupation */}
          <div>
            <label htmlFor="occupation" className="block text-gray-700 font-medium mb-1">Occupation</label>
            <input
              type="text"
              id="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.occupation ? 'border-red-500' : ''}`}
              placeholder="Enter your occupation"
            />
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>

          {/* Initial Deposit */}
          <div>
            <label htmlFor="initialDeposit" className="block text-gray-700 font-medium mb-1">Initial Deposit</label>
            <input
              type="text"
              id="initialDeposit"
              value={formData.initialDeposit}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.initialDeposit ? 'border-red-500' : ''}`}
              placeholder="Enter initial deposit amount"
            />
            {errors.initialDeposit && <p className="text-red-500 text-sm mt-1">{errors.initialDeposit}</p>}
          </div>

          {/* PIN */}
          <div>
            <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">Set a PIN</label>
            <input
              type="password"
              id="pin"
              value={formData.pin}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? 'border-red-500' : ''}`}
              placeholder="Enter a 4-6 digit PIN"
            />
            {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
