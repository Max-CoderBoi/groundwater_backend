import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb"; 

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("YOUR_DB_NAME"); 
    const collection = db.collection("YOUR_COLLECTION_NAME");

    const data = await collection.findOne({ _id: new ObjectId(id) });

    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
