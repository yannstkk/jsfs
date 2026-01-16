import ResponseBuilder from './ResponseBuilder.js';

export default class JsonResponseBuilder extends ResponseBuilder {
  #params;

  constructor(request, response, url, status = 200, contentType = 'application/json') {
    super(request, response, url, status, contentType);
  }



  buildBody() {
    this.#params = this.url.searchParams;
    
    const data = {};

    for (const [key, value] of this.#params.entries()) {
      data[key] = value;
    }

    data.date = new Date().toISOString();
    this.response.write(JSON.stringify(data));
  }

  buildFooter() {} // Vide, comme pour JSON
}