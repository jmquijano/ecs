import { Icon } from 'leaflet'
import React,{ useCallback, useMemo, useRef, useState } from 'react'
import { Marker, Popup,Tooltip,useMap, useMapEvents } from 'react-leaflet'

const Pin = (props) => {
  // pwede i butang sa context api
  const [position, setPosition] = useState(props.position)
  // pwede i butang sa context api

  const markerRef = useRef(null)
  // pang auto locate ni
  // const map = useMapEvents({
  //       click() {
  //         map.locate()
  //       },
  //       locationfound(e) {
  //         setPosition(e.latlng)
  //         map.flyTo(e.latlng, map.getZoom())
  //       },
  //     })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          // console.log(position)
          // console.log(marker)
          
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
        {/* <Tooltip>Tooltip for Marker</Tooltip> */}

    </Marker>
  )
}

export default Pin