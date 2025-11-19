"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Water Monitoring Portal 🚰
        </h1>

        <p className="text-gray-600 mb-6">
          Choose what you want to explore:
        </p>

        <div className="space-y-4">
          {/* Nearest Stations */}
          <Link 
            href="/nearest" 
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-lg 
                       hover:bg-blue-700 transform hover:scale-[1.02] transition"
          >
            📍 Find Nearest Stations
          </Link>

          {/* Search Location */}
          <Link 
            href="/search" 
            className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium shadow-lg 
                       hover:bg-green-700 transform hover:scale-[1.02] transition"
          >
            🔍 Search Location
          </Link>
        </div>
        
      </div>
    </div>
  );
}
