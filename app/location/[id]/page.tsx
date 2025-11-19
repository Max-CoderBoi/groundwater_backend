"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StationDetails() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/location/${id}`);
        const data = await res.json();
        setStation(data);
      } catch (err) {
        console.error("Error fetching station:", err);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!station) return <p className="text-center mt-10">Station not found.</p>;

  const {
    state,
    district,
    block,
    village,
    station_id,
    latitude,
    longitude,
    elevation,
    season,
    river_basin,
    is_active,
    last_reported
  } = station;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-6 border border-gray-200">
      <h1 className="text-3xl font-bold text-blue-700 border-b pb-3">
        {village} - Station Analytics 📊
      </h1>

      {/* Station Info */}
      <div className="mt-6 grid grid-cols-2 gap-6 text-gray-700">
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800">Location</h3>
          <p>{block}, {district}, {state}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800">Coordinates</h3>
          <p>Lat: {latitude}</p>
          <p>Lng: {longitude}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800">Elevation</h3>
          <p>{elevation ?? "N/A"} meters</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800">River Basin</h3>
          <p>{river_basin ?? "Unknown"}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800">Season</h3>
          <p>{season ?? "N/A"}</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-800">Status</h3>
          <p className={is_active ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
            {is_active ? "Active" : "Inactive"}
          </p>
        </div>
      </div>

      {/* Last Report */}
      <div className="mt-8 bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-800">Last Reported</h3>
        <p className="text-gray-700 mt-1">
          {last_reported ? new Date(last_reported).toLocaleString() : "No data available"}
        </p>
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition"
      >
        ← Back to Nearest Stations
      </button>
    </div>
  );
}
