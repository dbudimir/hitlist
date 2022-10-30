import { useState } from 'react'
import styled from 'styled-components'

const TagInputContainer = styled.div``

const TagInput = ({ setPlaceTags }) => {
  const [tags, setTags] = useState([])

  const removeTag = (i) => {
    const newTags = [...tags]
    newTags.splice(i, 1)
    setTags(newTags)
    setPlaceTags(newTags)
  }

  const inputKeyUp = (e) => {
    const val = e.target.value.toLowerCase()

    if (e.key === 'Enter' && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return
      }

      setTags([...tags, val])
      setPlaceTags([...tags, val])

      // Reset tag input field
      e.preventDefault()
      e.target.value = ''

      // Delete last character of tag
    } else if (e.key === 'Backspace' && !val) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <TagInputContainer>
      <div className="tag-container">
        <ul className="tag-list">
          {tags.map((tag, i) => (
            <li className="inserted-tag" key={tag}>
              {tag}
              <button type="button" onClick={() => removeTag(i)}>
                -
              </button>
            </li>
          ))}
          <li className="tag-input">
            <input type="text" placeholder="(ex. healthy, vegan, spicey)" onKeyUp={inputKeyUp} />
          </li>
        </ul>
      </div>
    </TagInputContainer>
  )
}

export default TagInput
