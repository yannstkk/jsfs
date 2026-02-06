import HtmlResponseBuilder from './HtmlResponseBuilder.js';



export default class About extends HtmlResponseBuilder {

  buildBody() {


    this.response.write('<h1>About page</h1>');
    this.response.write('<p>version 1.0 <p>')
  }


}