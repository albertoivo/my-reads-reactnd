import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import ListAllBookshelves from './ListAllBookshelves'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import AlertContainer from 'react-alert'
import { shelves } from './helper'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myBooks: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ myBooks: books })
    })
  }

  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then(newBooks => {
      book.shelf = shelf
      this.setState({
        myBooks: this.state.myBooks.filter(b => b.id !== book.id).concat(book)
      })
      this.showAlert(book.title, shelf)
    })
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 100,
    transition: 'scale'
  }

  showAlert = (bookTitle, newShelf) => {
    const shelf = shelves.find(shelf => shelf.shelf === newShelf)
    const nextShelf = shelf ? shelf.title : 'none'
    const msgAlert =
      nextShelf === 'none'
        ? `${bookTitle} is off the shelves`
        : `${bookTitle} is now on the shelf ${nextShelf}`

    this.msg.show(msgAlert, {
      time: 5000,
      type: 'success'
    })
  }

  render() {
    return (
      <div className="app">
        <AlertContainer
          ref={msgAlert => (this.msg = msgAlert)}
          {...this.alertOptions}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListAllBookshelves
              myBooks={this.state.myBooks}
              update={this.update}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks books={this.state.myBooks} update={this.update} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
