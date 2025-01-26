import React from "react";
import { Plane } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 animate-fly-1">
          <Plane className="w-8 h-8 text-gray-700" />
        </div>
        <div className="absolute top-1/2 -right-20 animate-fly-2">
          <Plane className="w-6 h-6 text-gray-700" />
        </div>
        <div className="absolute bottom-1/4 -left-16 animate-fly-3">
          <Plane className="w-5 h-5 text-gray-700" />
        </div>
      </div>
      <div className="text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-glow tracking-wider">
          LayNote
        </h1>
        <p className="text-xl mb-12 text-gray-400">
          Make the most of your time between flights
        </p>
        <button
          onClick={onStart}
          className="bg-violet-600 text-white px-8 py-4 rounded-lg 
            hover:bg-violet-700 transition-all duration-300 
            transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
