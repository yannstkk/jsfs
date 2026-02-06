import ResponseBuilder from './ResponseBuilder.js';



export default class Default extends ResponseBuilder {

  constructor(request, response, url, status = 200) {
    super(request, response, url, status, 'text/html');

  }

  

  
  buildHeader() {
    super.buildHeader();
    this.response.write(`
      <html>
        <head>
          <title>Default Page</title>
        </head>
        <body>
    `);
  }
    buildBody() {


        this.response.write("<!DOCTYPE html>");
        this.response.write("<html lang='en'>");
        this.response.write("<head>");
        this.response.write("<meta charset='UTF-8'>");
        this.response.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        this.response.write("<title>Default Page</title>");
        this.response.write("</head>");
        this.response.write("<body>");
        this.response.write("<h1>Welcome to the Default Page</h1>");
        this.response.write("<p>This is the default response.</p>");
        this.response.write("</body>");
        this.response.write("</html>");
        
    }

    



}

