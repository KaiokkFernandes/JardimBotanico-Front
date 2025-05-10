import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

// COLOCAR EM .ENV depois
const API_KEY = 'AIzaSyCvLkzPcr3l8HjR9AphjViWiLb6a3McGeA';

const MapWrapper = styled.section`
  padding: 4rem 2rem;
  background: #f9f9f9;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const MapContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 350px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const center = {
  lat: -29.7186,
  lng: -53.7137
};


const MapSection = () => {
    const [markerIcon, setMarkerIcon] = useState(null);
  
    useEffect(() => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        const icon = {
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
        };
        setMarkerIcon(icon);
      }
    }, []);

  return (
    <MapWrapper>
      <Title>Como nos encontrar?</Title>
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <MapContainer> {/* << AQUI USA O MAPCONTAINER! */}
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={16}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            {markerIcon && (
              <Marker
                position={center}
                title="Jardim Botânico da UFSM"
                icon={markerIcon}
              />
            )}
          </GoogleMap>
        </MapContainer>
      </LoadScript>
    </MapWrapper>
  );
};

export default MapSection;
