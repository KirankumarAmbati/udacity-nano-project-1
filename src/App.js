import React from 'react'
import Library from './components/Library'
import SearchPage from './components/SearchPage'
import * as BooksAPI from './BooksAPI'
import Loader from './components/Loader'
import {
  Route,
  Link,
} from 'react-router-dom'
import './App.css'


class BooksApp extends React.Component {
  constructor(){
    super()

    this.state = {
      books:[]
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillMount(){
    BooksAPI.getAll().then(books => (
      this.setState({
        books
      })
    ))
    
  }

  handleSelect(book, shelf){
    book.shelf = shelf
    BooksAPI.update(book, shelf).then(res => {
      this.setState( (prevState) => ({
        books: [...prevState.books.filter(i=>i.id!==book.id),book]
      }))
    })
  }

  render() {
    return (
        <div> 
          {
            this.state.books.length > 0 ? (
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
                            <Library books={this.state.books} handleSelect={this.handleSelect}/>
                          </div>

                          <Link to='/search'><span className="open-search">Search</span></Link>

                        </div>)}
                    />
                </div>
                <Route path='/search' render={() => (
                      <SearchPage 
                        booksOnShelf={this.state.books}
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
