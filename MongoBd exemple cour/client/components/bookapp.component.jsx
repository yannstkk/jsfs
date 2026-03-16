import React from 'react';
import { useState, useEffect } from 'react';

import BookList from './booklist.component.jsx';

import '../assets/css/bookapp.css';

const fetchAllBooks = async () => {
   const response = await fetch('/books/');
   const books = await response.json();
   return books;
}

const BookApp = () => {
   const [booklist, setBooklist] = useState([]);
   
   useEffect(() => {
         const doIt = async () => setBooklist( await fetchAllBooks() );         
         doIt();
      },
      []
   );

   return (
      <div>
         <BookList 
            booklist = { booklist }
         />
      </div>
   );
}

export default BookApp;