import React from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

function Library(props) {

    function _filterBooks(shelf){
        let filteredBooks = props.books.filter((book) => (
            book.shelf === shelf
        ))

        return filteredBooks
    }

    return(
        <div className="list-books-content">
            <BookShelf title={"Currently Reading"} books = {_filterBooks('currentlyReading')} handleSelect={props.handleSelect}/>
            <BookShelf title={"Want to Read"} books = {_filterBooks('wantToRead')} handleSelect={props.handleSelect}/>
            <BookShelf title={"Read"} books = {_filterBooks('read')} handleSelect={props.handleSelect}/>
        </div>
    )
}

Library.PropTypes = {
    books:PropTypes.array.isRequired,
    handleSelect:PropTypes.func.isRequired
}
export default Library