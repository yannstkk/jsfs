const fs   = require('fs').promises;
const path = require('path');
const contentTypeUtil = require('../scripts/contentTypeUtil');

const PUBLIC_FOLDER = path.join(__dirname, '..', 'public');

class RequestController {

    #request;
    #response;
    #url;

    constructor(request, response) {
        this.#request  = request;
        this.#response = response;

        var parsed = new URL(request.url, 'http://localhost');
        this.#url = parsed.pathname;
    }

    get request() {
        return this.#request;
    }

    get response() {
        return this.#response;
    }

    get url() {
        return this.#url;
    }

    async handle() {
        var urlToServe = this.#url;
        if (urlToServe === '/') {
            urlToServe = '/chartio.html';
        }

        var filePath = path.join(PUBLIC_FOLDER, urlToServe);

        var resolvedFile = path.resolve(filePath);
        var resolvedPublic = path.resolve(PUBLIC_FOLDER);

        if (!resolvedFile.startsWith(resolvedPublic)) {
            this.#response.writeHead(403, { 'Content-Type': 'text/plain' });
            this.#response.end('Acces interdit');
            return;
        }

        try {
            await fs.access(filePath);
            var data = await fs.readFile(filePath);
            var contentType = contentTypeUtil.getContentType(filePath);

            this.#response.writeHead(200, { 'Content-Type': contentType });
            this.#response.end(data);

        } catch (error) {
            this.#response.writeHead(404, { 'Content-Type': 'text/plain' });
            this.#response.end('fichier non trouvee : ' + urlToServe);
        }
    }
}

module.exports = RequestController;
