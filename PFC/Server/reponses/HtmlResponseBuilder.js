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
          <link href="./public/style/style.css" rel="stylesheet" type="text/css">
          <img src="./public/img/javaclasse.png" alt="timoleon bien sur"></img>
        </head>
        <body>
    `);
  }



  buildFooter() { }
}

