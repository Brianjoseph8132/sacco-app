import React from "react";
import { FaShieldAlt, FaChartLine, FaHandsHelping } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const coreValues = [
    {
      title: "Transparency",
      icon: <FaShieldAlt className="w-12 h-12 text-blue-600" />,
      description: "We maintain the highest standards of transparency in all our operations and financial dealings."
    },
    {
      title: "Member Growth",
      icon: <FaChartLine className="w-12 h-12 text-blue-600" />,
      description: "Facilitating financial growth and prosperity for all our members through innovative solutions."
    },
    {
      title: "Community Empowerment",
      icon: <FaHandsHelping className="w-12 h-12 text-blue-600" />,
      description: "Building stronger communities through financial education and support."
    }
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO",
      image: "https://i.pinimg.com/736x/0c/97/bb/0c97bb99376263d664e61e7914df1a8b.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Finance Director",
      image: "https://i.pinimg.com/736x/0c/66/39/0c6639dce780584ee0606ad89a1897ec.jpg"
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      image: "https://i.pinimg.com/736x/a8/ba/96/a8ba9626de3fadff0b38e1c83cdea435.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">About Our SACCO</h1>
              <p className="text-xl text-blue-100">Empowering communities through financial inclusion and cooperative growth since 1995.</p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d"
                alt="Financial Empowerment"
                className="rounded-lg shadow-xl w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">Founded in 1995, our SACCO has grown from a small community initiative to a leading financial cooperative serving thousands of members.</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-4">25+</span>
                  <span className="text-gray-700">Years of Service</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-4">10K+</span>
                  <span className="text-gray-700">Active Members</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600 mr-4">$50M+</span>
                  <span className="text-gray-700">In Assets</span>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                alt="SACCO Office"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white text-xl mb-8">Join our SACCO today and secure your financial future</p>
          
          <Link to="/register">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
              Create Account
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default About;