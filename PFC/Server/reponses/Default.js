import ResponseBuilder from './ResponseBuilder.js';



export default class Default extends ResponseBuilder {

  constructor(request, response, url, status = 200) {
    super(request, response, url, status, 'text/html');

  }

  

  
buildHeader() {
    super.buildHeader();
    this.response.write(`<!DOCTYPE html><html>...`);
}

buildBody() {
    this.response.write(`<h1>Bienvenue</h1>...`); 
}

buildFooter() {
    this.response.write(`</body></html>`); 
}

    



}

