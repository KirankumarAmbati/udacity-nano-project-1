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

        this.handleSearch = throttle(500, this.handleSearch.bind(this))
    }
    handleSearch(query) {
        let allBooks = this.props.booksOnShelf
        console.log('allBk', allBooks)

        BooksAPI.search(query).then(books => {
          this.setState(() => ({
            searchResults:books
          }))
        })

        console.log('SeB',this.state.searchResults)

        // this.state.filteredBooks.map(fBook => (
        //     allBooks.map(book => (
        //         fBook.id === book.id ?
        //         (
        //             fBook.shelf = book.shelf
        //             this.setState((prevState) => ({
        //                 filteredBooks: [...prevState.filteredBooks,fBook]
        //             }))
        //         ):('')
        //     ))
        // ))

        // this.state.filteredBooks.map(fbook => (
        //     allBooks.map(book => (
        //         fbook.id === book.id ?
        //         (
        //             fBook.shelf = book.shelf

        //             this.setState((prevState) => ({
        //                 filteredBooks: [...prevState.filteredBooks,fBook]
        //             }))
        //         ):
        //         (
        //             ''
        //         )
        //     ))
        // ))

        this.setState(() => ({
            filteredBooks:this.state.searchResults && this.state.searchResults.map(result => {
                let i = allBooks && allBooks.find(book => book.id === result.id)

                if(i){
                    console.log('i',i)
                    result.shelf = i.shelf
                } 

                return result
            })
        }))
    }

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
                        <input type="text" placeholder="Search by title or author" onChange={event=>this.handleSearch(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        
                            {console.log('props', this.state.filteredBooks)}
                            {this.state.filteredBooks && this.state.filteredBooks.map(book => (
                                <li className="bookList"  key={book.id}>
                                {console.log(book.shelf)}
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