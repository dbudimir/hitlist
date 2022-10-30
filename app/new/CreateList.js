import { useRef, useState } from 'react'
import styled from 'styled-components'

// Components

const CreateListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const CreateList = ({ listName, listDescription }) => {
  return (
    <CreateListContainer>
      <h2>Create a new hit list</h2>

      <label htmlFor="list-name">Name</label>
      <input id="list-name" className="list-name" ref={listName} />

      <label htmlFor="list-description">Description</label>
      <textarea
        className="list-description"
        id="list-description"
        name="list-description"
        ref={listDescription}
      />
    </CreateListContainer>
  )
}

export default CreateList
