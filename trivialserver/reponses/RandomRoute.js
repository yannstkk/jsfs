import JsonResponseBuilder from './JsonResponseBuilder.js';

export default class RandomRoute extends JsonResponseBuilder {

  buildBody() {
    const randomValue = Math.floor(Math.random() * 10);

    const data = { randomValue: randomValue };

    this.response.write(JSON.stringify(data));
  }
}