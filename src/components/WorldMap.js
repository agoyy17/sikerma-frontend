import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './WorldMap.css';
import customIconImage from './marker.png';

function WorldMap() {
  // Koordinat lokasi
  const usmPosition = [5.3560, 100.2966];    // Universitas Sains Malaysia, Penang
  const thammasatPosition = [14.0736, 100.6040]; // Thammasat University, Thailand

  const customIcon = new L.Icon({
    iconUrl: customIconImage, // Gambar yang digunakan
    iconSize: [40, 40],       // Ukuran ikon (lebar, tinggi)
    iconAnchor: [20, 40],     // Titik jangkar ikon
    popupAnchor: [0, -40],    // Posisi popup relatif ke ikon
  });

  return (
    <div className="map-container">
      <MapContainer center={usmPosition} zoom={5} scrollWheelZoom={true} className="leaflet-map">
        {/* Lapisan Peta */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marker Universitas Sains Malaysia */}
        <Marker position={usmPosition} icon={customIcon}>
          <Popup>Universitas Sains Malaysia, Penang</Popup>
        </Marker>

        {/* Marker Thammasat University */}
        <Marker position={thammasatPosition} icon={customIcon}>
          <Popup>Thammasat University, Thailand</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default WorldMap;
