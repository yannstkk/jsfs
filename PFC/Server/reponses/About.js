import HtmlResponseBuilder from './HtmlResponseBuilder.js';



export default class About extends HtmlResponseBuilder {

  constructor(request, response, url, status = 200) {
    super(request, response, url, status, 'text/html');

  }

  

  
buildHeader() {
    super.buildHeader();
}

buildBody() {
    this.response.write(`<h1>Bienvenue a la page about</h1>`); 
}

buildFooter() {
  super.buildFooter();
}

    



}

