'use client'

import { useRef, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

// Components
import Map from './Map'
import CreateList from './CreateList'
import AddPlace from './AddPlace'

// Style
const CreateFlowContainer = styled.div`
  padding: 18px;
`

export default function New() {
  // List
  let listName = useRef()
  let listDescription = useRef()
  const [listPlaces, setListPlaces] = useState([])

  const onSaveHitList = () => {
    const listIsValid =
      listName.current.value && listDescription.current.value && listPlaces.length > 0

    // const mockHitList = {
    //   name: 'DC Dives',
    //   description: 'Dive bars are fun',
    //   places: [
    //     {
    //       name: 'Solly',
    //       description: 'Fun Place',
    //       tags: ['cheap', 'dive'],
    //       formattedAddress: '1942 11th St NW, Washington, DC 20001, USA',
    //       location: [38.9168523, -77.02731639999999],
    //       googlePlaceId: 'ChIJG4Z35-W3t4kRL4fJQyEvuig',
    //     },
    //     {
    //       name: 'Raven',
    //       description: 'fun place',
    //       tags: ['cash only', 'cash'],
    //       formattedAddress: '3125 Mt Pleasant St NW #101, Washington, DC 20010, USA',
    //       location: [38.9294066, -77.03725829999999],
    //       googlePlaceId: 'ChIJn3Wi4SDIt4kR5u_j11V_k2M',
    //     },
    //   ],
    // }

    const hitList = {
      name: listName.current.value,
      description: listDescription.current.value,
      places: listPlaces,
    }

    axios.post(`/api/lists/create`, { ...hitList })

    if (listIsValid) {
      console.log('its valid')
    }
  }

  return (
    <div>
      <Map listPlaces={listPlaces} />
      <CreateFlowContainer>
        <CreateList listName={listName} listDescription={listDescription} />
        {
          <div>
            <h2>Add places to your hit-list</h2>
            {[...Array(listPlaces.length + 1)].map((e, i) => (
              <AddPlace
                key={`addplace${i}`}
                listPlaces={listPlaces}
                setListPlaces={setListPlaces}
              />
            ))}
          </div>
        }

        <hr />
        <button onClick={onSaveHitList}>Save hit list</button>
      </CreateFlowContainer>
    </div>
  )
}
