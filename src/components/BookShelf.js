import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import '../App.css'

function BookShelf(props) {
    let books = props.books

    return(
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{props.title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                {books.length >0 ? books.map(book => (
                    <li key={book.id}><Book book={book} handleSelect={props.handleSelect} /></li>
                )):"Wait for one !!"}
                </ol>
                </div>
            </div>
        </div>
    )
}

Book.propTypes = {
    books:PropTypes.array,
    handleSelect:PropTypes.func.isRequired
}

export default BookShelf