import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-10 md:px-20 pt-15 bg-gradient-to-b from-blue-300 to-white">
      <div className="max-w-5xl mx-auto">
        {/* Image Section */}
        <div className="mb-10">
          <img
            src="/logo2.png"
            alt="About TripMaster AI"
            className="w-40 h-auto object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About TripMaster AI</h1>

          <p className="text-lg text-gray-700 mb-4">
            TripMaster AI is your intelligent travel planning assistant, designed to make trip planning faster, smarter, and hassle-free. Whether you're a solo traveler, a couple, or a group of adventurers, TripMaster AI tailors personalized itineraries that suit your style, preferences, and budget.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>AI-powered itinerary generation</li>
            <li>Smart hotel and activity recommendations</li>
            <li>Interactive maps and day-wise planning</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to simplify travel planning for everyone by leveraging the power of artificial intelligence. We believe in saving you time, reducing stress, and inspiring unforgettable journeys.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Our Values</h2>
          <p className="text-gray-700 mb-2">
            At TripMaster AI, our foundation is built on values that drive innovation and user satisfaction. We believe great journeys start with thoughtful planning, and our goal is to make that process as delightful as the trip itself.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>User-Centric Design:</strong> Everything we build is for you, the traveler.</li>
            <li><strong>Innovation:</strong> Leveraging AI to revolutionize how trips are planned and enjoyed.</li>
            <li><strong>Transparency:</strong> Clear, unbiased, and helpful recommendations.</li>
            <li><strong>Continuous Improvement:</strong> We evolve with your feedback and the changing world.</li>
          </ul>


          <p className="text-sm text-gray-800 mt-12 text-center">
            &copy; {new Date().getFullYear()} TripMaster AI | All Rights Reserved | Created by Yash.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
