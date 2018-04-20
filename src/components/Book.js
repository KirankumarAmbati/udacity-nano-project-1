import React from 'react'
import PropTypes from 'prop-types'

function Book(props){

  let book = props.book

  return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.imageLinks !== undefined ?`url(${book.imageLinks.thumbnail})`:'' }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => props.handleSelect(book, e.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
  )
}

Book.propTypes = {
  book:PropTypes.array,
  handleSelect:PropTypes.func.isRequired
}

export default Book