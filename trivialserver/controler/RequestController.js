import { URL } from 'url';

import FirstRoute from '../reponses/FirstRoute.js';
import SecondRoute from '../reponses/SecondRoute.js';
import JsonResponseBuilder from '../reponses/JsonResponseBuilder.js';
import NotFoundResponse from '../reponses/NotFoundResponse.js';
import RandomRoute from '../reponses/RandomRoute.js';
import PublicFileResponseBuilder from '../reponses/PublicFileResponseBuilder.js';


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
      } else if (this.#url.pathname === '/random') {
        new RandomRoute(this.#request, this.#response, this.#url).build();
      } else if (this.#url.pathname.startsWith('/public')) {
        new PublicFileResponseBuilder(this.#request, this.#response, this.#url).buildResponse();
      } else {
        new NotFoundResponse(this.#request, this.#response, this.#url).build();
      }

  }
}