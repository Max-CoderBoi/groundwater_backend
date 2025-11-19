import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Station from "@/models/Station";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const stations = await Station.find({
      $or: [
        { state: { $regex: query, $options: "i" } },
        { district: { $regex: query, $options: "i" } },
        { block: { $regex: query, $options: "i" } },
        { village: { $regex: query, $options: "i" } }
      ]
    }).sort({ village: 1 }).limit(20).lean();

    return NextResponse.json(stations);
  } catch (err) {
    console.error("API ERROR → /api/search:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
