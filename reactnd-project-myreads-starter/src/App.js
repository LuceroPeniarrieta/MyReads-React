import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  terms = [
    'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 
    'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 
    'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 
    'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 
    'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 
    'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 
    'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'
  ];

  state = {
      books: [],
      booksSearch: []
  }

  update = (book, value) => {
    book.shelf = value

    BooksAPI.update(book, value).then(res => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({ books })
    })

    BooksAPI.search(this.terms[2], 20).then((booksSearch) => {
        this.setState({ booksSearch })
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/search' render={({ history }) => (
          <SearchBooks
            books={this.state.booksSearch} 
            history={history}
            updateCategory={this.update} 
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
                        books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                        updateCategory={this.update} 
                      /> 
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <ListBooks
                      books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                      updateCategory={this.update} 
                    /> 
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <ListBooks
                      books={this.state.books.filter((book) => book.shelf === 'read')}
                      updateCategory={this.update}                        
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
    </div>
    )
  }
}

export default BooksApp
