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
    lat,
    long,
    season,
    location
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
          <p>Lat: {lat ?? location?.coordinates[1]}</p>
          <p>Lng: {long ?? location?.coordinates[0]}</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg shadow-sm col-span-2">
          <h3 className="font-semibold text-gray-800">Season Data</h3>
          {season ? (
            <ul className="text-gray-700 text-sm mt-1 space-y-1">
              {Object.entries(season).map(([month, value]) => (
                <li key={month}>
                  <span className="font-medium">{month.toUpperCase()}:</span> {value}
                </li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition"
      >
        ← Back to Search
      </button>
    </div>
  );
}
