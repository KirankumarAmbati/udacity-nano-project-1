import React from 'react'
import BookShelf from './BookShelf'

class Library extends React.Component {

    _filterBooks(shelf){
        let filteredBooks = this.props.books.filter((book) => (
            book.shelf === shelf
        ))

        console.log(filteredBooks)
        return filteredBooks
    }
    render(){
        return(
            <div className="list-books-content">
                <BookShelf title={"Currently Reading"} books = {this._filterBooks('currentlyReading')} handleSelect={this.props.handleSelect}/>
                <BookShelf title={"Want to Read"} books = {this._filterBooks('wantToRead')} handleSelect={this.props.handleSelect}/>
                <BookShelf title={"Read"} books = {this._filterBooks('read')} handleSelect={this.props.handleSelect}/>
            </div>
        )
    }
}

export default Library