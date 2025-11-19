"use client";

import { useState } from "react";
import Link from "next/link";
import StationMap from "../components/StationMap";

export default function NearestStations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const findNearestStations = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setUserLocation([lat, lng]);

      try {
        const res = await fetch(`/api/nearest?lat=${lat}&lng=${lng}`);
        const data = await res.json();

        console.log("Nearest:", data);

        if (Array.isArray(data)) {
          setStations(data);
        } else {
          setError(data.error || "No stations found");
          setStations([]);
        }
      } catch {
        setError("Failed to fetch stations");
        setStations([]);
      }

      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            📍 Nearest Stations
          </h1>
          <p className="text-gray-600 mt-1">
            Find the closest water level monitoring stations to your location
          </p>
        </div>

        {/* Find Stations Button */}
        <button
          onClick={findNearestStations}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Locating..." : "Find Stations"}
        </button>

        {/* Error */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {/* Station List */}
        {stations.length > 0 && (
          <div className="mt-8 space-y-4">
            <ul>
              {stations.map((stn) => (
                <Link key={stn._id} href={`/station/${stn._id}`}>
                  <li className="p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-[1.02]">
                    {/* Village name in bold black */}
                    <p className="font-bold text-black text-lg">{stn.village}</p>
                    {/* Other details lighter */}
                    <p className="text-gray-600 text-sm mt-1">
                      {stn.block}, {stn.district}, {stn.state}
                    </p>
                    <p className="text-blue-600 font-medium mt-1">
                      {stn.distance.toFixed(2)} km away
                    </p>
                  </li>
                </Link>
              ))}
            </ul>

            {/* Map */}
            <div className="mt-6 h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <StationMap stations={stations} userLocation={userLocation} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
