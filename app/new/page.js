'use client'

import { useRef, useState } from 'react'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import styled from 'styled-components'

// Components
const Map = Dynamic(import('./Map'), { ssr: false })

import CreateList from './CreateList'
import AddPlace from './AddPlace'

// Style
const CreateFlowContainer = styled.div`
  padding: 18px;
  width: calc(100vw - 64px);
  margin: 0 auto;
  background: #ffffff;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: calc(100% - 300px);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  overflow: scroll;
  z-index: 10;
  font-family: 'Poppins';
  color: #393939;

  h3 {
    margin: 18px 0 6px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  input,
  textarea {
    padding: 8px;
    border-radius: 8px;
    border: 2px solid #eeeef1;
    font-family: 'Poppins';
  }
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

    if (listIsValid) {
      axios.post(`/api/lists/create`, { ...hitList })
      alert('Great, that worked')
    }
  }

  return (
    typeof window !== 'undefined' && (
      <>
        <Map listPlaces={listPlaces} />
        <CreateFlowContainer onScroll={scroll}>
          <CreateList listName={listName} listDescription={listDescription} />

          <div>
            <h3>Add places to your hit-list</h3>
            {[...Array(listPlaces.length + 1)].map((e, i) => (
              <AddPlace
                key={`addplace${i}`}
                listPlaces={listPlaces}
                setListPlaces={setListPlaces}
              />
            ))}
          </div>

          <hr />
          <button onClick={onSaveHitList}>Save hit list</button>
        </CreateFlowContainer>
      </>
    )
  )
}
