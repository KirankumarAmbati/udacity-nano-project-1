import React from 'react'
import {
    Route,
    Link,
  } from 'react-router-dom'

import App from '../App'
import '../App.css'
import { throttle } from 'throttle-debounce'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {
    constructor()
    {
        super()

        this.state = {
            searchResults:[],
            filteredBooks:[]
        }

        this.handleSearch = throttle(500, this.handleSearch);
    }
    handleSearch(query) {
        if(!query){
            this.setState(() => ({
                filteredBooks:[]
            }))
        }else{
            let allBooks = this.props.booksOnShelf
        
            BooksAPI.search(query).then(books => {
                this.setState(() => ({
                    searchResults:books
                }))
            })

            this.setState(() => ({
                filteredBooks:this.state.searchResults.length > 0 && this.state.searchResults.map(result => {
                    let requiredBook = allBooks && allBooks.find(book => book.id === result.id)

                    if(requiredBook){
                        result.shelf = requiredBook.shelf
                    } 

                    return result
                })
            }))
        }
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'><span className="close-search">Search</span></Link>
                    <Route exact path='/' component={App} />
                    <div className="search-books-input-wrapper">
                       <input
                            autoFocus
                            type="text"
                            onChange={event=>this.handleSearch(event.target.value)}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.filteredBooks && this.state.filteredBooks.map(book => (
                            <li className="bookList"  key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:book.imageLinks !== undefined ?`url(${book.imageLinks.thumbnail})`:'' }}></div>
                                    <div className="book-shelf-changer">
                                        {book.shelf !== undefined ? (
                                            <select value={book.shelf} onChange={(e) => this.props.handleSelect(book, e.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        ):(
                                            <select onChange={(e) => this.props.handleSelect(book, e.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none" selected={true}>None</option>
                                        </select>
                                        )}
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