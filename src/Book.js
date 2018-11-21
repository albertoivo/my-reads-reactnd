import React from 'react'
import { shelves } from './helper'
import StarRatingComponent from 'react-star-rating-component'

const Book = ({ book, update }) => {
  return (
    <div className="book">
      <div className="book-top">
        <a href={book.previewLink} target="_blank" rel="noopener noreferrer">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${(book.imageLinks &&
                book.imageLinks.thumbnail) ||
                ''})`
            }}
          />
        </a>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || 'none'}
            onChange={event => update(book, event.target.value)}
          >
            <option value="" disabled>
              Move to...
            </option>
            {shelves.map(s => (<option key={s.shelf} value={s.shelf}>{s.title}</option>))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <StarRatingComponent name="book-rate" value={book.averageRating} />
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && book.authors.join(', ')}
      </div>
    </div>
  )
}

export default Book
