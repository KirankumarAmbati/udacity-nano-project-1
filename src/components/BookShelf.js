import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
    render() {
        let allBooks = this.props.allBooks

        console.log(allBooks)

        return(
            <div>
                {allBooks && allBooks.map(i => (
                    <Book book={i} />
                ))}
            </div>
        )
    }
}

export default BookShelf