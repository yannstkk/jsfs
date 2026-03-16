
const Book = ({ book }) =>  {
   
   const { _id, title, author, year } = book;

   return (             
      <tr className="book">           
         <td className="author">{author}</td>
         <td className="title">
            <a href={`/books/details/${_id}`} >{title}</a>
         </td>
         <td className="year">{year}</td>
      </tr>
   );
}

export default Book;