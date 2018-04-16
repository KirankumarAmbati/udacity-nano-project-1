import React from 'react'
import Book from './Book'
import '../App.css'

class BookShelf extends React.Component {
    render() {
        let books = this.props.books

        console.log(books)

        return(
            <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books ? books.map(i => (
                        <li key={i.id}><Book book={i} handleSelect={this.props.handleSelect} /></li>
                    )):"Wait for one !!"}
                    </ol>
                  </div>
                </div>
            </div>
        )
    }
}

export default BookShelf