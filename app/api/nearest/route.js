import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Station from "@/models/Station";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat"));
    const lng = parseFloat(searchParams.get("lng"));

    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json(
        { error: "Valid lat & lng query params required" },
        { status: 400 }
      );
    }

    const stations = await Station.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 300000 // 300km radius
        }
      },
      { $limit: 3 },
      {
        $project: {
          state: 1,
          district: 1,
          block: 1,
          village: 1,
          location: 1, // 👈 required for map marker
          season: 1,
          distance: { $round: [{ $divide: ["$distance", 1000] }, 2] } // km
        }
      }
    ]);

    return NextResponse.json(stations);
  } catch (err) {
    console.error("ERROR → /api/nearest:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
