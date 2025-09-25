/* =======================
   IMPORTS & APP SETUP
   ======================= */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

/* =======================
   INITIALIZE FIREBASE ADMIN
   ======================= */
const serviceAccount = require(path.join(__dirname, "serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/* =======================
   AQUFER CHARACTERISTICS
   ======================= */
app.get("/aquifers/:id", async (req, res) => {
  try {
    const doc = await db.collection("aquifer_characteristics").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Aquifer not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/aquifers/:id", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
    await db.collection("aquifer_characteristics").doc(req.params.id).set(req.body, { merge: true });
    res.json({ message: "Aquifer saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   CURRENT WATER LEVELS
   ======================= */
app.get("/current-water-levels/:id", async (req, res) => {
  try {
    const doc = await db.collection("current_water_levels").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Data not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   DROUGHT INDICATORS
   ======================= */
app.get("/drought-indicators/:id", async (req, res) => {
  try {
    const doc = await db.collection("drought_indicators").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Data not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   DWLR STATIONS
   ======================= */
app.get("/dwlr-stations/:id", async (req, res) => {
  try {
    const doc = await db.collection("dwlr_stations").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Station not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   HISTORICAL WATER LEVELS 2024
   ======================= */
app.get("/historical-water-levels-2024/:id", async (req, res) => {
  try {
    const doc = await db.collection("historical_water_levels_2024").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Data not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   RECENT HOURLY DATA
   ======================= */
app.get("/recent-hourly-data/:id", async (req, res) => {
  try {
    const doc = await db.collection("recent_hourly_data").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Data not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   WATER QUALITY DATA
   ======================= */
app.get("/water-quality-data/:id", async (req, res) => {
  try {
    const doc = await db.collection("water_quality_data").doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Data not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   EXPORT AS CLOUD FUNCTION
   ======================= */
exports.api = functions.https.onRequest(app);
