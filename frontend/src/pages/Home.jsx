import React, { useContext, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaMoneyBillAlt, FaShieldAlt, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {hasAccount} = useContext(AccountContext);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Communities Through Financial Growth</h1>
              <p className="text-lg mb-8">Join our SACCO to access secure savings, affordable loans, and fast transactions. Build a better financial future together.</p>
              <div className="flex flex-wrap gap-4">
              {hasAccount ? (
                <Link to="/about">
                  <button className="bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition">Learn More</button>
                </Link>
              ) : (
                <>
                  <Link to="/account">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">Create Account</button>
                  </Link>
                  <Link to="/about">
                    <button className="bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition">Learn More</button>
                  </Link>
                </>
              )}

                
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                alt="Financial Growth"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Easy Loan Applications */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaMoneyBillAlt className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Easy Loan Applications</h3>
              <p className="text-gray-600">Simple and straightforward loan application process with quick approval times.</p>
            </div>

            {/* Secure Savings */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Savings</h3>
              <p className="text-gray-600">Your savings are protected with state-of-the-art security measures.</p>
            </div>

            {/* Fast Transactions */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FaBolt className="text-yellow-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Transactions</h3>
              <p className="text-gray-600">Quick and efficient transactions for all your financial needs.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;