import ResponseBuilder from './ResponseBuilder.js';



export default class HtmlResponseBuilder extends ResponseBuilder {

  constructor(request, response, url, status = 200) {
    super(request, response, url, status, 'text/html');

  }

  

  
  buildHeader() {
    super.buildHeader();
    this.response.write(`
        <head>
          <title>Node TP</title>
          <link href="./public/style/style.css" rel="stylesheet" type="text/css">
          <img src="./public/img/javaclasse.png" alt="timoleon bien sur"></img>
        </head>
    `);
  }



  buildFooter() {    
   this.response.write(`<footer style="background-color: #f0f0f0; padding: 10px; text-align: center;"> my footer </footer>`); 
 }
}

