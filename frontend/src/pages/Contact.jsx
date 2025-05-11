import React from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8">

        {/* Contact Form */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the subject"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            {/* Send Message Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details Sidebar */}
        <div className="w-full md:w-1/3 bg-blue-50 rounded-2xl p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Details</h3>

          <div className="flex items-center gap-3 text-gray-700 mb-4">
            <PhoneIcon className="h-6 w-6 text-blue-600" />
            <span>+254 712 345 678</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 mb-4">
            <EnvelopeIcon className="h-6 w-6 text-blue-600" />
            <span>info@saccoexample.com</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <MapPinIcon className="h-6 w-6 text-blue-600" />
            <span>Nairobi, Kenya</span>
          </div>
        </div>

      </div>
    </div>
  );
}
