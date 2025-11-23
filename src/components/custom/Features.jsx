import React from 'react';

const features = [
  {
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"
        ></path>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 4.636"
        ></path>
      </svg>
    ),
    title: 'Personalized Itineraries',
    description:
      'Get customized travel plans tailored to your interests, budget, and style.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M3 14h18M7 6h.01M17 6h.01M7 18h.01M17 18h.01"
        ></path>
      </svg>
    ),
    title: 'Explore Hidden Gems',
    description:
      'Discover lesser-known destinations and local favorites off the beaten path.',
  },
  {
    icon: (
      <svg
        className="w-10 h-10 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
    ),
    title: 'Google Maps Integration',
    description:
      'Easily navigate your itinerary with embedded Google Maps for real-time directions and location details.',
  },
];

const FeatureSection = () => {
  return (
    <section className="py-10 px-6 bg-gray-50 -mt-15" id="features" >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Why Choose <span className="text-blue-600">TripMaster AI?</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Experience smart travel planning with features designed to make your trips unforgettable.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3">
        {features.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-shadow duration-300"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
