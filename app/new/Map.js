import { useState, useEffect } from 'react'
import Script from 'next/script'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet-active-area'
import styled from 'styled-components'

// Style
const MapWindow = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;

  .active-area {
    position: absolute;
    top: 48px;
    left: 0px;
    right: 0px;
    height: 220px;
    width: 100%;
    box-sizing: border-box;
    z-index: 9999;
  }

  .map-container {
    width: 100%;
    min-height: -webkit-fill-available;
    position: fixed;

    .place-icon {
      z-index: 1;
    }
  }
`

const Map = ({ listPlaces }) => {
  const [map, setMap] = useState(null) // Gives us access to make changes to our leaflet map
  const [userPosition, setUserPosition] = useState(null)

  const position = [51.505, -0.09]

  const setUpMap = () => {
    console.log('do center')
    console.log(navigator.geolocation)
    console.log('the map', map)
  }

  const scroll = () => {
    console.log('its scrolling')
  }

  useEffect(() => {
    // var startPos

    if (typeof window !== 'undefined') {
      window.onload = () => {
        const geoSuccess = (position) => {
          console.log(position)
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        }
        navigator.geolocation.getCurrentPosition(geoSuccess)
      }

      window.addEventListener('scroll', scroll, ['once'])
    }

    if (map && userPosition) {
      map.setActiveArea('active-area')
      map.panTo(userPosition)
    }
  }, [map, userPosition])

  console.log(map)

  useEffect(() => {
    console.log('the places changed')
    const markerBounds = listPlaces.map(({ location }) => location)

    if (map && listPlaces.length) {
      map.setActiveArea('active-area')
      map.fitBounds([markerBounds])
    }
  }, [listPlaces])

  return (
    <MapWindow id="map">
      {/* <Script src="L.activearea.js" /> */}
      <MapContainer
        className="map-container"
        whenReady={setUpMap}
        ref={setMap}
        center={[38.9294066, -77.03725829999999]}
        zoom={15}
        minZoom={10}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        {listPlaces.map(({ location: [lat, lng] }, i) => {
          // let iconContainer = document.createElement('div')
          //

          const icon = L.icon({
            // className: `place-icon`,
            iconSize: [32, 32],
            iconUrl: '/marker-icon.png',
            // html: renderToStaticMarkup(
            //   <Image src="/marker-icon.png" alt="marker" width="32" height="32" />
            // ),
          })
          // const icon = L.divIcon({ className: `place-icon`, html: '<div>My place</div>' })

          console.log({ lat, lng })

          return (
            <Marker
              id={`place${i}`}
              key={`place${i}`}
              position={{ lat, lng }}
              icon={icon}
              eventHandlers={{ click: (e) => clickEvent(e) }}
            />
          )
        })}

        {/* <Marker position={position}></Marker> */}
      </MapContainer>
    </MapWindow>
  )
}

export default Map
