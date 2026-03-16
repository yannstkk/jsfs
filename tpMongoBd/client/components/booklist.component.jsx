
import Book from './book.component.jsx';

import '../assets/css/booklist.css';


const BookList = ({ booklist }) => {

   const books = booklist.map( book => <Book book={book}                                         
                                             key={book._id}
                                       />);

   return (
      <table className="booklist">
         <tbody>
            {books}
         </tbody>
      </table>
   );
}

export default BookList;