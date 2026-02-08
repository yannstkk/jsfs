import { URL } from 'url';
import fs from 'fs';

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
        const pathname = this.#url.pathname;
        let filePath = null;
        let contentType = 'text/html';

        if (pathname === '/' || pathname === '/index.html') {
            filePath = './public/index.html';
        } else if (pathname === '/about' || pathname === '/about.html') {
            filePath = './public/about.html';
        } else if (pathname === '/pfc' || pathname === '/pfc.html') {
            filePath = './public/pfc.html';
        } else if (pathname.endsWith('.css')) {
            filePath = `./public${pathname}`;
            contentType = 'text/css';
        } else if (pathname.endsWith('.js')) {
            filePath = `./public${pathname}`;
            contentType = 'application/javascript';
        } else if (pathname.endsWith('.png') || pathname.endsWith('.jpg')) {
            filePath = `./public${pathname}`;
            contentType = pathname.endsWith('.png') ? 'image/png' : 'image/jpeg';
        }





        if (filePath) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    this.#response.writeHead(404, { 'Content-Type': 'text/html' });
                    this.#response.end('<h1>404 - Page non trouvée</h1>');
                } else {
                    this.#response.writeHead(200, { 'Content-Type': contentType });
                    this.#response.end(data);
                }
            });
        } else {
            this.#response.writeHead(404, { 'Content-Type': 'text/html' });
            this.#response.end('<h1>404 - Page non trouvée</h1>');
        }
    }
}