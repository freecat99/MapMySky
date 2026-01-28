import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
});

useEffect(() => {
    map.locate();
}, [map]);

if (!position) return null;
console.log(position)

  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function Map() {
  return (
    <MapContainer
      center={[28.639, 77.236]}
      zoom={15}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;
