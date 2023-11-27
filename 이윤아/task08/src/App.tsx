import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
const MapComponent = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://smart.incheon.go.kr/server/rest/services/Hosted/상습_침수구역/FeatureServer/194/query?outFields=*&where=1%3D1&f=geojson'
        );
        setGeojsonData(response.data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1>지도 보기</h1>
      {geojsonData && (
        <MapContainer
          style={{ height: '500px', width: '100%' }}
          zoom={12}
          center={[37.456, 126.705]}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeoJSON
            data={geojsonData}
            style={() => ({
              color: 'black',
              weight: 2, 
              fillOpacity: 0.5,
              fillColor: 'green' 
            })}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(`속성 값: ${JSON.stringify(feature.properties)}`);
            }}
          />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
