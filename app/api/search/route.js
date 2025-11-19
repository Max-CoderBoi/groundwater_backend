// app/api/search/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Location from "@/models/Location"; // Mongoose model for your "locations" collection

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const stations = await Location.find({
      $or: [
        { state: { $regex: query, $options: "i" } },
        { district: { $regex: query, $options: "i" } },
        { block: { $regex: query, $options: "i" } },
        { village: { $regex: query, $options: "i" } }
      ]
    });

    return NextResponse.json(stations);
  } catch (err) {
    console.error("API ERROR → /api/search:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
