import ResponseBuilder from './ResponseBuilder.js';

export default class JsonResponseBuilder extends ResponseBuilder {
  #params;



  constructor(request, response, url, status = 200, contentType) {
    super(request, response, url, status, contentType);

  }


  
  buildBody() {

    // let value = this.url.searchParams.get('value') || 'unknown';
    // let color = this.url.searchParams.get('color') || 'unknown';

    
    this.#params = this.url.searchParams;
    
    const data = {};

    for (const [key, value] of this.#params.entries()) {
      data[key] = value;
    }

    data.date = new Date().toISOString();
    this.res.write(JSON.stringify(data));
  }

  
  buildHeader() {} 

  buildFooter() {} 
}