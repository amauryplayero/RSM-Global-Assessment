import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";




export default function Map(props) {
  let center
  let latitude = props.coordinates.latitude
  let longitude = props.coordinates.longitude
  let windowWidth = props.windowWidth
  let containerStyle

  useEffect(()=>{
    
  }, [latitude,longitude])

  if(windowWidth=400){
     containerStyle = {
      width: '300px',
      height: '200px'
    };

  } else{

    containerStyle = {
      width: '400px',
      height: '400px'
    };
  }

    if(latitude === undefined){
      return (<></>)

    } else {
      center = {lat: parseFloat(latitude), 
                lng: parseFloat(longitude)}
    }
 
  return (
      <>
      <LoadScript googleMapsApiKey="AIzaSyA24d9fZWIHid1RGcM649JMkas26tC5Qvk">
      <div id="mapBorder">
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}>
                 <Marker position={{lat:center.lat, lng:center.lng}} 
                         animation={1}/>
                 <></>
      </GoogleMap>
      </div>
      </LoadScript>
      </>
  )
}
