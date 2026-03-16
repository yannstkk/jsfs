
// fetch all books with GET and fill table #booklist
const fillTable = async () => {
   const booksTable = document.getElementById('booklist');
   booksTable.textContent = '';
   const requestOptions = {
      method: 'GET'
   };
   const response = await fetch('/books/', requestOptions);
   const allbooks = await response.json();

   allbooks.forEach(book => booksTable.appendChild( buildBookElement(book) ) );
}

// fonctions pour créer les élements de la table

// crée un ligne (<tr>) pour un livre
const buildBookElement = book => {
   const bookElement = document.createElement('tr');
   bookElement.className = 'book';
   bookElement.appendChild(buildTD(book.author, 'author'));
   bookElement.appendChild(buildTD(book.title, 'title'));
   bookElement.appendChild(buildTD(book.year, '')); 
   return bookElement;
}

// crée une "case" (<td>)
const buildTD = (content, className) => {
   const TDelement = document.createElement('td');
   TDelement.textContent = content;
   TDelement.className = className;
   return TDelement;
}


// fonction exécutée au chargement du script (et donc de la page)
fillTable(); // remplit la table avec les données sur les livres récupérées par fetch


