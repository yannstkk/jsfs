import HtmlResponseBuilder from './HtmlResponseBuilder.js';

export default class FirstRoute extends HtmlResponseBuilder {

  buildBody() {


    this.response.write('<h1>Page first</h1>');
    this.response.write('<p>premiere page statique<p>')
  }


}
