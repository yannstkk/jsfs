
export default class ResponseBuilder {

  #request;
  #response;
  #url;
  #status;
  #contentType;

  constructor(request, response, url, status, contentType) {
    this.#request = request;
    this.#response = response;
    this.#url = url;
    this.#status = status;
    this.#contentType = contentType;
  }

  get response() {
    return this.#response;
  }
  get url() {
    return this.#url;
  }



  buildHeader() {
    this.response.statusCode = this.#status;
    this.response.setHeader('Content-Type', this.#contentType);
  }

  buildBody() {}

  buildFooter() {}

  build() {
    this.buildHeader();
    this.buildBody();
    this.buildFooter();
    this.response.end();
  }
}
