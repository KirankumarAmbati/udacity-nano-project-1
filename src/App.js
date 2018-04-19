import React from 'react'
import './App.css'
import Library from './components/Library'
import SearchPage from './components/SearchPage'
import * as BooksAPI from './BooksAPI'
import Loader from './components/Loader'
import {
  Route,
  Link,
} from 'react-router-dom'


class BooksApp extends React.Component {
  constructor(){
    super()

    this.state = {
      allBooks:[]
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount(){
    BooksAPI.getAll().then(books => (
      this.setState({
        allBooks: books
      })
    ))
    
  }

  handleSelect(book, shelf){
    book.shelf = shelf
    console.log(book,shelf)
    BooksAPI.update(book, shelf).then(res => {
      this.setState( (prevState) => ({
        allBooks: [...prevState.allBooks.filter(i=>i.id!==book.id),book]
      }))
    })
    
    BooksAPI.getAll().then(books => (
      this.setState({
        allBooks: books
      })
    ))
  }

  render() {
    return (
        <div> 
          {
            this.state.allBooks.length > 0 ? (
              <div className="app">
                <div>
                    <Route 
                      exact path='/'
                      render={ () =>(
                        <div className="list-books">

                          <div className="list-books-title">
                            <h1>MyReads</h1>
                          </div>

                          <div className="list-books-content">
                            <Library books={this.state.allBooks} handleSelect={this.handleSelect}/>
                          </div>

                          <Link to='/search'><span className="open-search">Search</span></Link>

                        </div>)}
                    />
                </div>
                <Route path='/search' render={() => (
                      <SearchPage 
                        booksOnShelf={this.state.allBooks}
                        handleSearch={this.handleSearch} 
                        handleSelect={this.handleSelect}
                      />
                )} />
              </div>
            ):
            (
              <Loader />
            )
          }
        </div>
    )
  }
}

export default BooksApp
