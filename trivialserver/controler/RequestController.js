import { URL } from 'url';

import FirstResponseBuilder from '../response/FirstResponseBuilder.js';
import SecondResponseBuilder from '../response/SecondResponseBuilder.js';
import JsonResponseBuilder from '../response/JsonResponseBuilder.js';
import NotFoundResponseBuilder from '../response/NotFoundResponseBuilder.js';

export default class RequestController {



  #request;
  #response;
  #url;



  constructor(request, response) {

    this.#request = request;
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);

  }

  handleRequest() {



      if (this.#url.pathname === '/first') {
        new FirstRoute(this.#request, this.#response, this.#url).build();
      } else if (this.#url.pathname === '/second') {
        new SecondRoute(this.#request, this.#response, this.#url).build();
      } else if (this.#url.pathname === '/json') {
        new JsonResponseBuilder(this.#request, this.#response, this.#url).build();
      } else {
        new NotFoundResponse(this.#request, this.#response, this.#url).build();
      }

  }
}
