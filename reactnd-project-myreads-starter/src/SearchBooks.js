import React, { Component } from 'react'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'

class SearchBooks extends Component{
    state = {
        query: ''
    }

    update = (book, value) => {
        book.shelf = value

        this.props.updateCategory(book, value)
        this.props.history.push('/')
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim()})
    }

    render() {
        const {books} = this.props;
        const {query} = this.state;
        let showBooks;

        if(query){
            this.props.searchBooks(query);
            showBooks = books;
        }
        else{
            showBooks = books;
        }

        return (
            <div className="search-books"> 
                <div className="search-books-bar">
                    
                    <Link to='/'>
                        <a className='close-search'>Close</a>
                    </Link>
            
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                        value={this.state.query} onChange={(event) => (this.updateQuery(event.target.value))}>
                        </input>
                    </div>
                </div>
                <ListBooks
                    books={showBooks}
                    updateCategory={this.update}
                />
            </div>
        )
    }
}

export default SearchBooks