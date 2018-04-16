import React from 'react'
import './App.css'
import Library from './components/Library'
import SearchPage from './components/SearchPage'
import * as BooksAPI from './BooksAPI'

import {
  Route,
  Link,
} from 'react-router-dom'


class BooksApp extends React.Component {
  constructor(){
    super()
    
    // console.log(BooksAPI.getAll().then(books => console.log(books)))
    
    this.state = {
      allBooks:[],
      filteredBooks:[]
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount(){
    BooksAPI.getAll().then(books => (
      this.setState({
        allBooks: books,
        filteredBooks:books
      })
    ))
    
  }

  handleSearch(e) {
    // let filteredBooks = this.state.allBooks.filter(book => (
    //   book.title.includes(e.target.value) ||
    //   book.authors.map(author => (
    //     console.log(author.includes(e.target.value))
    //   ))
    // ))
    console.log(e.target.value)

    let filteredBooks = BooksAPI.search(e.target.value)
    console.log(filteredBooks)
  }

  handleSelect(book, shelf){
    console.log(book,shelf);
    BooksAPI.update(book, shelf)
    this.forceUpdate()
  }

  render() {
    return (
      <div className="app">
          <div>
              <Route exact path='/' render={ () =>(
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <Library books={this.state.allBooks} handleSelect={this.handleSelect}/>
                  </div>
                  <Link to='/search'><span className="open-search">Search</span></Link>
              </div>
              )} />
          </div>
          <Route path='/search' render={() => (
                <SearchPage 
                  books={this.state.filteredBooks} 
                  handleSearch={this.handleSearch} 
                  handleSelect={this.handleSelect}
                />
          )} />
      </div>
    )
  }
}

export default BooksApp
