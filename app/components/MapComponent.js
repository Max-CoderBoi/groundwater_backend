"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const stationIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent({ stations, userLocation }) {
  if (!userLocation) return null;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden mt-6 shadow-lg">
      <MapContainer
        center={userLocation}
        zoom={9}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <Marker position={userLocation} icon={stationIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {stations.map((s) => (
          <Marker
            key={s._id}
            position={[s.location.coordinates[1], s.location.coordinates[0]]}
            icon={stationIcon}
          >
            <Popup>
              <b>{s.name}</b>
              <br />
              Distance: {(s.distance / 1000).toFixed(2)} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
