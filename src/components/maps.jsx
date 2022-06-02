import { Text } from '@chakra-ui/react';
import React, { useCallback, useState, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

function HandleGeolocPermission() {
  if ("geolocation" in navigator) {
    console.log("Available");
  } else {
    console.log("Not Available");
  }
}


function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView(coords, zoom ?? 5);

  return null;
}

const Maps = (props) => {
  
  return (
    <MapContainer 
      center={props.center} 
      zoom={props.zoom} 
      scrollWheelZoom={props.scrollWheelZoom || false}
      style={{height: props?.height ?? '100%', width: props?.width ?? '100%'}}
      >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView coords={props?.center} zoom={props.zoom} />
        {props.children}
    </MapContainer>

  )
}

const Pin = (props) => {
    const [position, setPosition] = useState(props.position)
    const markerRef = useRef(null)
  
    const eventHandlers = useMemo(() => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            props.onChange({
              lng: marker.getLatLng().lng,
              lat: marker.getLatLng().lat
            });
          }
        },
      }),
      [],
    )
  
    return (
      <Marker 
        draggable={true}
        eventHandlers={eventHandlers}
        position={props.position}
        ref={markerRef}
      
      >
          <Popup >{props.PopupMessage}</Popup>
  
      </Marker>
    )
}

export { Maps, Pin, HandleGeolocPermission }