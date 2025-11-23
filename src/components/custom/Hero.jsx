import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full md:h-[80vh] object-cover z-[-1]"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video-bg-5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional: Overlay for better readability */}
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-[rgba(0,0,0,0.4)] z-0"></div>

      {/* Foreground Content */}
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left mt-10 md:h-[80vh] md:pb-10 pb-30">
        <div className="relative z-1 flex flex-col text-white p-5 pb-10 md:ml-20 mt-5">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mt-15 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]">
            Your Next Trip Starts with a Click:
          </h1>
          <h2 className="font-bold text-xl md:text-3xl text-blue-200 tracking-tight mt-10 drop-shadow-[2px_2px_3px_rgba(0,0,0,0.5)]">
            Personalized Itineraries at Your Fingertips
          </h2>

          <p className="text-md md:text-xl max-w-2xl mt-5">
            Your personal trip planner and travel curator — custom itineraries
            tailored to your interests and budget.
          </p>
          <Link to="/create-trip">
            <Button className="mt-10 text-lg text-white border border-white bg-transparent hover:bg-white hover:text-black rounded-4xl cursor-pointer drop-shadow-[2px_2px_5px_rgba(0,0,0,0.8)]">
              Get Started, It's Free
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-3 md:gap-6 md:p-4 p-2 bg-[rgba(255,255,255,0.3)] shadow-md rounded-xl z-1 md:mr-25 md:mt-10 cursor-pointer hover:rotate-2">
          {/* Left Column: Two stacked images */}
          <div className="flex flex-col gap-2 md:gap-4">
            <img
              src="/travel-img-2.jpg"
              alt="Travel Image 2"
              className="h-28 w-auto md:h-44 rounded-lg shadow-sm object-cover"
            />
            <img
              src="/travel-img-3.jpg"
              alt="Travel Image 3"
              className="h-28 w-auto md:h-44 rounded-lg shadow-sm object-cover"
            />
          </div>

          {/* Right: One main image */}
          <div>
            <img
              src="/travel-img-1.jpg"
              alt="Travel Image 1"
              className="w-40 h-48 md:w-64 md:h-[368px] rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
