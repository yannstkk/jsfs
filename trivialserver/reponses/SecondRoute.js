import HtmlResponseBuilder from './HtmlResponseBuilder.js';


export default class SecondRoute extends HtmlResponseBuilder {

  buildBody() {


    this.response.write('<h1>Page second</h1>');
    this.response.write('<p>deuxieme page statique<p>')
  }


}
