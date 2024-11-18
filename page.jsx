"use client"
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Dummy Data
const SOCKET_URL = "ws://localhost:8080";  // This is your WebSocket URL, but we're using dummy data here
const initialLat = 52.5074;
const initialLon = -0.1234;
const id = "truck_!23";

const App = () => {
  // State to hold current location of the asset
  const [location, setLocation] = useState({ lat: initialLat, lon: initialLon });
  const [assetMarker, setAssetMarker] = useState(null);

  const mapRef = useRef(); // Reference to the map container

  useEffect(() => {
    // Simulate real-time location updates using setInterval
    const interval = setInterval(() => {
      // Simulating random movement (for demo purposes)
      const newLat = location.lat + (Math.random() - 0.5) * 0.01; // Move lat by a random value
      const newLon = location.lon + (Math.random() - 0.5) * 0.01; // Move lon by a random value

      setLocation({ lat: newLat, lon: newLon });

      if (assetMarker) {
        // Move the marker to the new location
        assetMarker.setLatLng([newLat, newLon]);
      } else {
        // If the marker doesn't exist, create a new one
        const newMarker = L.marker([newLat, newLon]).addTo(mapRef.current);
        newMarker.bindPopup(`Asset ID: ${id}`);
        setAssetMarker(newMarker);
      }
    }, 5000); // Update every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [location, assetMarker]);

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
        center={[location.lat, location.lon]} // Initial map center
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* If location data is available, show the marker */}
        {location && (
          <Marker position={[location.lat, location.lon]}>
            <Popup>{`Asset ID: ${id}`}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default App;
