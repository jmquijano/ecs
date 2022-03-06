import React, { useCallback, useState, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Maps = (props) => {
  return (
    <MapContainer 
      center={props.center} 
      zoom={props.zoom} 
      scrollWheelZoom={props.scrollWheelZoom || false}
      style={{height: "100%", width: "100%"}}
      >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
        position={position}
        ref={markerRef}
      
      >
          <Popup >{props.PopupMessage}</Popup>
  
      </Marker>
    )
}

export { Maps, Pin }