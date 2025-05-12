import React, { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";

const CreateAccount = () => {
  const { createAccount } = useContext(AccountContext);

  const [initial_deposit, setInitialdeposit] = useState('');
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');
  const [occupation, setOccupation] = useState('');
  const [id_number, setIdnumber] = useState('');

  
  const errors = {};

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert initial_deposit to float and id_number to int
    const depositAmount = parseFloat(initial_deposit);
    const idNum = parseInt(id_number);
  
    createAccount(depositAmount, pin, phone, occupation, idNum);
  
    // reset the fields
    setInitialdeposit('');
    setIdnumber('');
    setOccupation('');
    setPhone('');
    setPin('');
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your phone number"
            />
          </div>

          {/* ID Number */}
          <div>
            <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-1">ID Number</label>
            <input
              type="number"
              id="idNumber"
              value={id_number}
              onChange={(e) => setIdnumber(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.idNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your ID number"
            />
          </div>

          {/* Occupation */}
          <div>
            <label htmlFor="occupation" className="block text-gray-700 font-medium mb-1">Occupation</label>
            <input
              type="text"
              id="occupation"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.occupation ? 'border-red-500' : ''}`}
              placeholder="Enter your occupation"
            />
          </div>

          {/* Initial Deposit */}
          <div>
            <label htmlFor="initialDeposit" className="block text-gray-700 font-medium mb-1">Initial Deposit</label>
            <input
              type="text"
              id="initialDeposit"
              value={initial_deposit}
              onChange={(e) => setInitialdeposit(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.initialDeposit ? 'border-red-500' : ''}`}
              placeholder="Enter initial deposit amount"
            />
          </div>

          {/* PIN */}
          <div>
            <label htmlFor="pin" className="block text-gray-700 font-medium mb-1">Set a PIN</label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pin ? 'border-red-500' : ''}`}
              placeholder="Enter a 4-digit PIN"
            />
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
