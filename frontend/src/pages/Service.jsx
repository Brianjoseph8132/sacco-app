import React, { useState } from "react";
import { FaMoneyBillWave, FaPiggyBank, FaChartLine, FaStar, FaAngleDown, FaAngleUp } from "react-icons/fa";

const Service = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const services = [
    {
      id: 1,
      title: "Loan Applications",
      icon: <FaMoneyBillWave className="text-4xl text-blue-600" />,
      description: "Quick and easy loan processing with competitive rates",
      details: [
        "Personal and Business Loans",
        "Flexible Terms up to 60 months",
        "Competitive Interest Rates",
        "Quick Approval Process"
      ]
    },
    {
      id: 2,
      title: "Savings Accounts",
      icon: <FaPiggyBank className="text-4xl text-blue-600" />,
      description: "Secure savings solutions with attractive returns",
      details: [
        "High-Yield Savings Accounts",
        "Term Deposits",
        "Youth Savings Programs",
        "Retirement Planning"
      ]
    },
    {
      id: 3,
      title: "Repayment Plans",
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      description: "Flexible repayment options tailored to your needs",
      details: [
        "Customized Payment Schedules",
        "Auto-Debit Options",
        "Early Repayment Benefits",
        "Payment Holiday Options"
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      image: "https://i.pinimg.com/736x/39/c6/37/39c6378eab548db431676ecc28e4e545.jpg",
      text: "The loan process was incredibly smooth. I received my business loan within days!",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      image: "https://i.pinimg.com/736x/27/39/72/273972c2bb8c4fe16e176dff31b9f89a.jpg",
      text: "Their savings programs helped me secure my financial future. Excellent service!",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Brown",
      image: "https://i.pinimg.com/736x/38/d5/64/38d564e91b64bc0258896e35c8df359e.jpg",
      text: "The flexible repayment options made my loan management stress-free.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl mx-auto">Empowering your financial journey with innovative solutions and personalized service</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-center mb-4">{service.title}</h3>
              <p className="text-gray-600 text-center mb-4">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Services Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Services Information</h2>
          {services.map((service) => (
            <div key={service.id} className="mb-4">
              <button
                className="w-full bg-white p-4 rounded-lg shadow flex items-center justify-between hover:bg-gray-50"
                onClick={() => setExpandedSection(expandedSection === service.id ? null : service.id)}
              >
                <span className="text-xl font-semibold">{service.title}</span>
                {expandedSection === service.id ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              {expandedSection === service.id && (
                <div className="bg-white p-6 rounded-b-lg shadow mt-1">
                  <ul className="space-y-2">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Members Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white text-xl mb-8">Join our SACCO today and secure your financial future</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;