import React from 'react'
import { Button } from '../ui/button'

export const AboutSection = () => {
  return (
    <section className="pt-4 pb-20 px-4 md:px-16 bg-white text-gray-800 -mt-15" id="about">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image or Illustration */}
        <div className="w-full md:w-1/2">
          <img
            src="/travel-img.jpg"
            alt="About TripMaster AI"
            className="w-full h-auto rounded-xl shadow-md object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">
            About <span className="text-blue-600">TripMaster AI</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-gray-600 mb-4">
            TripMaster AI is your smart travel companion powered by AI. It helps you plan the perfect itinerary, discover places, book stays, and explore hidden gems—all personalized to your preferences and travel style.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            Whether you're planning a solo adventure, a family vacation, or a romantic getaway, TripMaster AI takes the stress out of planning so you can focus on enjoying the journey.
          </p>
          <div className="flex justify-start items-center -mt-5">
            <a href="/about">
                <Button className="mt-10 text-lg text-blue-800 border-2 border-blue-800 bg-transparent hover:bg-blue-800 hover:text-white rounded-4xl cursor-pointer">
                Learn More
                </Button>
            </a>
           </div>
        </div> 
    </div>
    <div className="flex justify-center gap-5">
      <div className="w-3 h-3 rounded-lg bg-blue-600 mt-10 mb-4"></div>
      <div className="w-3 h-3 rounded-lg bg-blue-600 mt-10 mb-4"></div>
      <div className="w-3 h-3 rounded-lg bg-blue-600 mt-10 mb-4"></div>
    </div>    
    </section>
  )
}

export default AboutSection
