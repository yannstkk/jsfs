
/* retrieve the model : necessary to interact with the database */
const Books = require('../models/books.model').model;

const list =  async (_, res) => {
      const allBooks = await Books.find();                    // select all the books from database
      res.status(200).json(allBooks);
   }
/*
 *  controller that renders the book list found in the database
 */
const listThen =
  (_, res) =>
      Books.find()                                            // select all the books from database
        .then(allBooks => res.status(200).json(allBooks) );


/* controller for /books/dune : find book(s) with title Dune */
const dune =
   async (_, res) => {
      const allBooks = await Books.find({ title: 'Dune' });          // select all the documents that match the given property, here title='Dune'
      const result = {
         description: 'all books where title is Dune',
         request: "Books.find({title : 'Dune'})",
         mongooseRequestResult: allBooks
      };
      res.status(200).json(result);
   }



const DEFAULT_YEAR = 2000;
/* controller for /books/afterv1/:year find books where year after :year */
const booksAfter2000v1 =
   async (req, res) => {
      const from = parseInt(req.params.year) || DEFAULT_YEAR;
      const allBooks = await Books.find({ year: { $gt: from } });     // select all the documents that match the given property, here year > *from*
      const result = {
         description: `all books were year > ${from}`,
         request: "Books.find({ year: { $gt: from } })",
         mongooseRequestResult: allBooks
      };
      res.status(200).json(result);
   }

/* controller for /books/afterb2/:year find books where year after :year */
const booksAfter2000v2 =
   async (req, res) => {
      const from = parseInt(req.params.year) || DEFAULT_YEAR;
      const allBooks = await Books.find().where('year').gt(from);       // select all the documents that match the given property, here year > *from*
      const result = {
         description: `all books were year > ${from}`,
         request: "Books.find().where('year').gt(from)",
         mongooseRequestResult: allBooks
      };
      res.status(200).json(result);
   }


/* controller for path /books/one : find one book */
const oneBook =
   async (_, res) => {
      const foundBook = await Books.findOne();     // select first found document
      const result = {
         description: 'first book in base',
         request: "Books.findOne()",
         mongooseRequestResult: foundBook
      };
      res.status(200).json(result);
   }


/* controller for /details/:bookId :  find books with _id= :bookId using findById()
(quasi) équivalent à
           Books.findOne({ _id : req.params.bookId })
           Books.findOne().where('_id').equals( req.params.bookId )
*/
const details =
   async (req, res) => {
      const foundBook = await Books.findById(req.params.bookId);
      const result = {
         description: 'first book with given _id',
         request: "Books.findById(req.params.bookId)",
         mongooseRequestResult: foundBook
      };
      res.status(200).json(result);
   }


/* controller for POST /create : execute the create operation in the db and return created book of successfull*/
const createBook =
   async (req, res, _) => {
      //const newBook = { title : req.body.title, author : req.body.author, year : req.body.year, cover : req.body.cover };
      const newBookData = { ...req.body };    // extract object from body using '...' operator and pattern matching
      const createdBook = await Books.create(newBookData);
      res.status(200).json(createdBook);
      /*  promise.then version
      Books.create(newBook)
        .then( createdook => res.status(200).json(createdBook) ) ;    //  responds with code 200 and sends created book
       */
   }


module.exports.list = list;
module.exports.listThen = listThen;
module.exports.dune = dune;
module.exports.booksAfter2000v1 = booksAfter2000v1;
module.exports.booksAfter2000v2 = booksAfter2000v2;
module.exports.oneBook = oneBook;
module.exports.details = details;

module.exports.create = createBook;
