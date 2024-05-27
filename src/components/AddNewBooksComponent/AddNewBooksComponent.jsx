import React, { useState } from 'react'
import './AddNewBooksComponent.css'
import axios from 'axios'

const AddNewBooksComponent = () => {
  const [bookInfo, setBookInfo] = useState({
    bookName: '',
    authorName: '',
    ISBN: '',
    genre: '',
  });

  const bookNameHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      bookName: event.target.value,
    });
  };

  const authorNameHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      authorName: event.target.value,
    });
  };

  const ISBNHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      ISBN: event.target.value,
    });
  };

  const genreHandler = (event) => {
    setBookInfo({
      ...bookInfo,
      genre: event.target.value,
    });
  };

  const { bookName, authorName, ISBN, genre } = bookInfo;

  const formSubmitHandler = (event) => {
    event.preventDefault()
    
    axios
      .post(`http://localhost:3500/api/v1/books`, bookInfo)
      .then(response => {
        alert(`${response.data.bookName} is added successfully`)
        window.location.href = '/'
      })
      .catch(error => {
        if(error.response)
          {
            alert(`Status ${error.response.status} - ${error.response.message}`)
          }
      })
  }


  return (
    <form className='form-container' onSubmit={formSubmitHandler}>
      <h2>Adding a new book</h2>

      <div className='form-group'>
        <label>Book Name</label>
        <input
          type='text'
          placeholder='Enter the book name'
          value={bookName}
          onChange={bookNameHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>Author Name</label>
        <input
          type='text'
          className='form-control'
          placeholder='Enter the author name'
          value={authorName}
          onChange={authorNameHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>ISBN Number</label>
        <input
          type='text'
          pattern='[0-9]{13}'
          placeholder='Enter the ISBN Number'
          value={ISBN}
          onChange={ISBNHandler}
          required
        />
      </div>

      <div className='form-group'>
        <label>Genre</label>
        <input
          type='text'
          placeholder='Enter the genre'
          value={genre}
          onChange={genreHandler}
          required
        />
      </div>

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default AddNewBooksComponent;
