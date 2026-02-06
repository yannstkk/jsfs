import HtmlResponseBuilder from './HtmlResponseBuilder.js';



export default class pfc extends HtmlResponseBuilder {

  buildBody() {


    this.response.write('<h1>page pfc statique</h1>');
    this.response.write('<p>version 1.0 <p>')
  }


}