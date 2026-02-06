import {URL} from 'url';
import Default from '../reponses/Default.js';
import About from '../reponses/About.js';
import pfc from '../reponses/About.js';
import NotFoundResponse from '../reponses/NotFoundResponse.js';



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



      if (this.#url.pathname === '/') {
        new Default(this.#request, this.#response, this.#url).build();
      } else if (this.#url.pathname === '/About') {
        new About(this.#request, this.#response, this.#url).build();
      } else if (this.#url.pathname === '/pfc') {
        new pfc(this.#request, this.#response, this.#url).build();
      } else {
        new NotFoundResponse(this.#request, this.#response, this.#url).build();
      }

  }
}
