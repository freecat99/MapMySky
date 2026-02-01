import React, { useEffect, useState } from "react";
import { CircleMarker, LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [23.5120, 80.3290];

function LocationMarker({position, setPosition}) {
  
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng);
    },
  });
  
  useEffect(() => {
    map.locate();
  }, [map]);
  
  if (!position) return null;
  
  return (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function Map() {
  const [position, setPosition] = useState(null);

  return (
    <div className="map">

    <MapContainer
      center={defaultCenter}
      zoom={18}
      style={{ height: "90vh", width: "90vw" }}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      <LocationMarker position={position} setPosition={setPosition}/>
      
      <LayersControl position="topright">
        <LayersControl.Overlay checked={false} name="Satellite View">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={['mt1','mt2','mt3']}
            />
        </LayersControl.Overlay>

        {/* Add geoJSON controls */}


      </LayersControl>
    </MapContainer>
            
            
    </div>
  );
}

export default Map;
