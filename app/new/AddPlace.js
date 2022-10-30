import { useRef, useState, useEffect } from 'react'
import Script from 'next/script'
import styled from 'styled-components'

// Components
import TagInput from '../../components/TagInput'

const CreateListContainer = styled.div``

const AddPlace = ({ listPlaces, setListPlaces }) => {
  const [showRemovePlace, setShowRemovePlace] = useState(false)

  // Place
  let autocomplete = useRef()
  let placeInput = useRef()
  let placeName = useRef()
  let placeDescription = useRef()
  const [placeTags, setPlaceTags] = useState([])
  const [currentPlace, setCurrentPlace] = useState({})

  const handleScriptLoad = () => {
    console.log('do this')
    // Initialize Google Autocomplete
    /*global google*/
    autocomplete = new google.maps.places.Autocomplete(placeInput.current, {})
    // Avoid paying for data that you don't need by restricting the
    // set of place fields that are returned to just the address
    // components and formatted address
    autocomplete.setFields(['formatted_address', 'geometry', 'place_id'])
    // Fire Event when a suggested name is selected
    autocomplete.addListener('place_changed', handlePlaceSelect)
  }

  useEffect(() => {
    console.log(window)
    window.google && handleScriptLoad()
  }, [])

  const handlePlaceSelect = async () => {
    // Extract City From Address Object
    const addressObject = autocomplete.getPlace()

    const { formatted_address, geometry, place_id } = addressObject

    if (addressObject) {
      setCurrentPlace({
        name: placeInput.value,
        formattedAddress: formatted_address,
        location: [geometry.location.lat(), geometry.location.lng()],
        googlePlaceId: place_id,
      })
    }

    // const address = encodeURIComponent(addressObject.formatted_address)

    // const geocode = await axios.get(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBqOo7JXE1JVCsT9oOTfvFddCssuWQr3Lc`
    // )

    // console.log(geocode)

    // Check if address is valid
    // if (address) {
    //   // Set State
    //   // console.log(address)
    // }
  }

  const onAddPlace = () => {
    console.log('add the place')
    const newPlace = {
      name: placeName?.current?.value || currentPlace.name,
      description: placeDescription.current.value,
      tags: placeTags,
      formattedAddress: currentPlace.formattedAddress,
      location: currentPlace.location,
      googlePlaceId: currentPlace.googlePlaceId,
    }

    setListPlaces([...listPlaces, newPlace])
    setShowRemovePlace(true)
  }

  return (
    <CreateListContainer>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqOo7JXE1JVCsT9oOTfvFddCssuWQr3Lc&libraries=places"
        onLoad={handleScriptLoad}
      />
      <div className="add-place">
        <label htmlFor="place-input">Search</label>
        <input id="place-input" className="place-input" ref={placeInput} />

        <label htmlFor="place-name">Name</label>
        <input id="place-name" className="place-name" ref={placeName} />

        <label htmlFor="place-description">Description</label>
        <textarea
          className="place-description"
          id="place-description"
          name="place-description"
          ref={placeDescription}
        />
        <TagInput setPlaceTags={setPlaceTags} />
        {showRemovePlace ? (
          <button onClick={onAddPlace}>Remove from Hit-list</button>
        ) : (
          <button onClick={onAddPlace}>Add to Hit-list</button>
        )}
      </div>
    </CreateListContainer>
  )
}

export default AddPlace
