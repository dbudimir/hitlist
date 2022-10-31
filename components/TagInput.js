import { useState, useRef } from 'react'
import styled from 'styled-components'

const removeIcon = (
  <svg width="20px" height="20px" viewBox="0 0 22 22" version="1.1">
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g id="x-circle" transform="translate(1.000000, 1.000000)" stroke-width="2">
        {/* <circle id="Oval" cx="10" cy="10" r="10"></circle> */}
        <line x1="13" y1="7" x2="7" y2="13" id="Path"></line>
        <line x1="7" y1="7" x2="13" y2="13" id="Path"></line>
      </g>
    </g>
  </svg>
)

const addIcon = (
  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1">
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <g id="plus-circle" transform="translate(1.000000, 1.000000)" stroke-width="2">
        <circle id="Oval" cx="10" cy="10" r="10"></circle>
        <line x1="10" y1="6" x2="10" y2="14" id="Path"></line>
        <line x1="6" y1="10" x2="14" y2="10" id="Path"></line>
      </g>
    </g>
  </svg>
)

const TagInputContainer = styled.div`
  .tag-container {
    display: flex;
    flex-wrap: wrap;

    .inserted-tag {
      background: #8cb89f;
      width: max-content;
      margin-right: 4px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 2px;
      color: #ffffff;
      padding: 2px 4px 2px 8px;
      border-radius: 100px;
      font-size: 14px;

      .remove {
        border: 0;
        padding: 0;
        border-radius: 100px;
        display: flex;

        svg g {
          stroke: #ffffff;
        }
      }
    }

    .tag-input {
      width: 100%;
      position: relative;

      .add {
        height: 40px;
        width: 40px;
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          g {
            stroke: #000000;
          }
        }
      }
    }

    input {
      width: 100%;
      box-sizing: border-box;
    }
  }
`

const TagInput = ({ setPlaceTags }) => {
  const tagInput = useRef()
  const [tags, setTags] = useState([])

  const removeTag = (i) => {
    const newTags = [...tags]
    newTags.splice(i, 1)
    setTags(newTags)
    setPlaceTags(newTags)
  }

  const addTag = (tag) => {
    setTags([...tags, tag])
    setPlaceTags([...tags, tag])
    tagInput.current.value = ''
    tagInput.current.focus()
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
      <label htmlFor="tag-description">Tags</label>
      <div className="tag-container">
        {tags.map((tag, i) => (
          <div className="inserted-tag" key={tag}>
            {tag}
            <div class="remove" onClick={() => removeTag(i)}>
              {removeIcon}
            </div>
          </div>
        ))}
        <div className="tag-input">
          <input
            ref={tagInput}
            type="text"
            placeholder="(ex. trendy, dive, dog friendly)"
            onKeyUp={inputKeyUp}
          />
          <div class="add" onClick={() => addTag(tagInput.current.value)}>
            {addIcon}
          </div>
        </div>
      </div>
    </TagInputContainer>
  )
}

export default TagInput
