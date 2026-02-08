import HtmlResponseBuilder from './HtmlResponseBuilder.js';



export default class Default extends HtmlResponseBuilder {

  constructor(request, response, url, status = 200) {
    super(request, response, url, status, 'text/html');

  }

  

  
buildHeader() {
    super.buildHeader();
}

buildBody() {
    this.response.write(`<h1>Bienvenue a la page default</h1>`); 
}

buildFooter() {
  super.buildFooter();
}

    



}

