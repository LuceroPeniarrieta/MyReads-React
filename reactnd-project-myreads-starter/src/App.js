import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
            books: []
  }

  componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
  }

  render() {

    return (
      <div className="app">

          <Route exact path='/search' render={() => (
                  <SearchBooks
                   books = {this.state.books}
                  />
          )}/>

          <Route exact path='/'render={() => (

            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        <ListBooks
                         books = {this.state.books.filter((book) => book.shelf == 'currentlyReading')}
                        /> 
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <ListBooks
                       books = {this.state.books.filter((book) => book.shelf == 'wantToRead')}
                      /> 
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <ListBooks
                       books = {this.state.books.filter((book) => book.shelf == 'read')}
                      /> 
                    </ol>
                  </div>
                </div>
              </div>
            </div>
              <div className="open-search">
                <Link to='/search'></Link>
              </div>
            </div>
          )}/>
        )}
      </div>
    )
  }
}

export default BooksApp
