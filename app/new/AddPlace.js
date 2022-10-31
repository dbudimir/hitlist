import { useRef, useState, useEffect } from 'react'
import Script from 'next/script'
import styled from 'styled-components'

// Components
import TagInput from '../../components/TagInput'

const CreateListContainer = styled.div`
  .add-place {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      -webkit-appearance: none;
      background: #ffffff;
      margin-bottom: 12px;
    }

    > button {
      background-color: #86aef4;
      font-size: 16px;
      border: unset;
      padding: 10px;
      margin: 6px 0;
      font-family: inherit;
      font-weight: 600;
      color: #ffffff;
      border-radius: 100px;
    }

    &.is-saved {
      > input {
        padding: 0px;
        font-size: 16px;
        border: none;
        color: #86aef4;
      }
      .input-options {
        display: none;
      }
    }
  }
`

const AddPlace = ({ listPlaces, setListPlaces }) => {
  const [isEditingPlace, setIsEditingPlace] = useState(false)
  const [isSavedPlace, setIsSavedPlace] = useState(false)

  // Place
  let autocomplete = useRef()
  let placeInput = useRef()
  let placeName = useRef()
  let placeDescription = useRef()
  const [placeTags, setPlaceTags] = useState([])
  const [currentPlace, setCurrentPlace] = useState({})

  const handleScriptLoad = () => {
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
      setIsEditingPlace(true)
    }
  }

  const onAddPlace = () => {
    const newPlace = {
      name: placeName?.current?.value || currentPlace.name,
      description: placeDescription.current.value,
      tags: placeTags,
      formattedAddress: currentPlace.formattedAddress,
      location: currentPlace.location,
      googlePlaceId: currentPlace.googlePlaceId,
    }

    setListPlaces([...listPlaces, newPlace])
    setIsSavedPlace(true)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.google && handleScriptLoad()
    }
  }, [])

  return (
    <CreateListContainer>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBqOo7JXE1JVCsT9oOTfvFddCssuWQr3Lc&libraries=places"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div className={`add-place ${isEditingPlace && 'is-editing'} ${isSavedPlace && 'is-saved'}`}>
        <input
          id="place-input"
          className="place-input"
          ref={placeInput}
          placeholder="Start typing..."
        />
        {isEditingPlace && !isSavedPlace && (
          <>
            <label htmlFor="place-name">Name</label>
            <input
              id="place-name"
              className="place-name"
              ref={placeName}
              placeholder="What do you call this place?"
            />

            <label htmlFor="place-description">Description</label>
            <textarea
              className="place-description"
              id="place-description"
              name="place-description"
              ref={placeDescription}
              placeholder="Tell us about it..."
            />
            <TagInput setPlaceTags={setPlaceTags} />
            <button onClick={onAddPlace}>Add to Hit-list</button>
          </>
        )}
      </div>
    </CreateListContainer>
  )
}

export default AddPlace
