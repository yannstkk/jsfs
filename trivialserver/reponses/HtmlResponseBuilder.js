import ResponseBuilder from './ResponseBuilder.js';



export default class HtmlResponseBuilder extends ResponseBuilder {

  constructor(request, response, url, status = 200) {
    super(request, response, url, status, 'text/html');

  }

  

  
  buildHeader() {
    super.buildHeader();
    this.response.write(`
      <html>
        <head>
          <title>Node TP</title>
        </head>
        <body>
    `);
  }



  buildFooter() {
    const date = new Date().toISOString();



    this.response.write(`
        <footer>
          <p>reponse generee le ${date}</p>
        </footer>
      </body>
      </html>
    `);
  }
}

