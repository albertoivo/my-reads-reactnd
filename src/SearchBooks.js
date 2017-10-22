import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {

  state = {
    query: '',
    showingBooks: []
  }

  search = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query, 20).then((searchedBooks) => {
        this.setState({showingBooks: searchedBooks})
      }, this.setState({showingBooks: []}))
    } else {
      this.setState({query: ''})
      this.setState({showingBooks: []})
    }
  }

  render() {

    const { query, showingBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.search(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Shelf
            title={showingBooks.length > 0 ? 'Search Results' : ''}
            books={showingBooks instanceof Array ? showingBooks : []}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks