import React, { useEffect,useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { Button } from "@chakra-ui/react";

const Maps = (props) => {
    // const [position, setPosition] = useState(null)
    // const map = useMapEvents({
    //     click() {
    //       map.locate()
    //     },
    //     locationfound(e) {
    //       setPosition(e.latlng)
    //       map.flyTo(e.latlng, map.getZoom())
    //     },
    //   })
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

export default Maps