"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchStations() {
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setStations([]);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setStations(data);
      } else {
        setError(data.error || "No stations found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch stations");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          🔍 Search Stations
        </h1>

        {/* Search input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city, district, or state"
            className="flex-1 p-3 rounded-lg border border-gray-300 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-black mb-4 text-center">{error}</p>}

        {/* Station list */}
        {stations.length > 0 && (
          <ul className="space-y-4">
            {stations.map((stn) => (
              <Link key={stn._id} href={`/location/${stn._id}`}>
                <li className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer hover:scale-[1.02] text-black">
                  <p className="font-semibold text-black text-lg">{stn.village}</p>
                  <p className="text-black text-sm">
                    {stn.block}, {stn.district}, {stn.state}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
