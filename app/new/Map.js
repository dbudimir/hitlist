import { useState, useEffect } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import styled from 'styled-components'

// Style
const MapWindow = styled.div`
  width: 100%;
  height: 30vh;
  overflow: hidden;

  .map-container {
    width: 100%;
    height: 30vh;
  }
`

const Map = ({ listPlaces }) => {
  const [map, setMap] = useState(null) // Gives us access to make changes to our leaflet map
  const [userPosition, setUserPosition] = useState(null)

  const position = [51.505, -0.09]

  const setUpMap = () => {
    console.log('do center')
    console.log(navigator.geolocation)
    console.log(map)
  }

  useEffect(() => {
    // var startPos

    window.onload = function () {
      const geoSuccess = (position) => {
        console.log(position)
        setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude })
      }
      navigator.geolocation.getCurrentPosition(geoSuccess)
    }

    if (map && userPosition) {
      console.log('userpos', userPosition)
      console.log('do center')
      console.log(navigator.geolocation)
      map.panTo(userPosition)
    }
  }, [map, userPosition])

  useEffect(() => {
    console.log('the places changed')
    const markerBounds = listPlaces.map(({ location }) => location)
    console.log(markerBounds)

    map && map.fitBounds([markerBounds])
  }, [listPlaces])

  return (
    <MapWindow className="mapclass">
      <MapContainer
        className="map-container"
        whenReady={setUpMap}
        ref={setMap}
        center={[0, 0]}
        zoom={15}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        {listPlaces.map(({ location: [lat, lng] }, i) => {
          const icon = L.divIcon({
            className: `marker-icon`,
            html: renderToStaticMarkup(<div>My place</div>),
          })

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
