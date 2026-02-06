import HtmlResponseBuilder from './HtmlResponseBuilder.js';

export default class NotFoundResponse extends HtmlResponseBuilder {

  constructor(request, response, url) {
    super(request, response, url, 404);
  }

  buildBody() {
    this.response.write(`<h1>404</h1>`);
    this.response.write(`<p>Page ${this.url.pathname} n'a pas ete trouvee</p>`);
  }
}
