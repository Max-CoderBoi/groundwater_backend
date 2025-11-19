import mongoose from "mongoose";

const StationSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  block: { type: String, required: true },
  village: { type: String, required: true },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
      validate: {
        validator: function (v) {
          return (
            Array.isArray(v) &&
            v.length === 2 &&
            v[0] >= -180 && v[0] <= 180 &&   // Longitude bounds
            v[1] >= -90 && v[1] <= 90        // Latitude bounds
          );
        },
        message: "Invalid coordinates: [lng, lat] must be numbers and valid range."
      }
    }
  },

  season: {
    jan: { type: Number, default: null },
    apr_may: { type: Number, default: null },
    aug: { type: Number, default: null },
    nov: { type: Number, default: null }
  }
});

// Geo Index for nearest search
StationSchema.index({ location: "2dsphere" });

export default mongoose.models.Station ||
  mongoose.model("Station", StationSchema, "locations");
