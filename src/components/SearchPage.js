import React from 'react'
import {
    Route,
    Link,
  } from 'react-router-dom'

import App from '../App'
import '../App.css'

class SearchPage extends React.Component {
    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/'><span className="close-search">Search</span></Link>
                <Route exact path='/' component={App} />

                {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" onChange={this.props.handleSearch}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        
                            {console.log(this.props.books[0])}
                            {this.props.books.map(book => (
                                <li className="bookList"  key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(e) => this.props.handleSelect(book, e.target.value)}>
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
                            </li>
                            ))}
                    </ol>
                </div>
          </div>
        )
    }
}

export default SearchPage