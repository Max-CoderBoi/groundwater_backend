import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb"; // your Mongoose connection
import Station from "@/models/Station";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    await connectDB(); // connect to MongoDB via Mongoose

    const { id } = await context.params; // unwrap params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const station = await Station.findById(id).select(
      "state district block village location season"
    );

    if (!station) {
      return NextResponse.json({ error: "Station Not Found" }, { status: 404 });
    }

    return NextResponse.json(station);
  } catch (err) {
    console.error("Station API error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
