import React, { Component } from 'react'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'

class SearchBooks extends Component{

    updateQuery = (query) => {
        this.props.searchBooks(query);
    }

    render() {
        const {books, updateCategory} = this.props;

        return (

            <div className="search-books"> 
                <div className="search-books-bar">
                    
                    <Link to='/' className='close-search'>Close</Link>
            
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => (this.updateQuery(event.target.value))}>
                        </input>
                    </div>
                    
                </div>
                <ListBooks
                    books={books}
                    updateCategory={updateCategory}
                />
            </div>
        )
    }
}

export default SearchBooks