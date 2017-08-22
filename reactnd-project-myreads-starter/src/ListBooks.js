import React, { Component } from 'react'
class ListBooks extends Component{

    handleChange(book, shelf) {
        this.props.updateCategory(book, shelf);
    }

    render() {
        const {books} = this.props;

        return(
            <div className='bookshelf-books' >
                <ol className='books-grid'>
                {books.map( book => (
                    <li key={book.id}>
                        <div className='book'>
                            <div className="book-top">
                                <div className="book-cover" style={{ 
                                    width: 128, 
                                    height: 193, 
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                                    }}>
                                </div>
                                <div className="book-shelf-changer"> 

                                    <select onChange={event => this.handleChange(book, event.target.value)} value={book.shelf}>
                                        <option value="moveTo" disabled>Move to...</option>
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
        )
    }
}

export default ListBooks;