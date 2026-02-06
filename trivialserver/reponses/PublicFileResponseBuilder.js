import ResponseBuilder from "./ResponseBuilder.js";
import {readFileSync, constants , accessSync} from 'fs';
import path from "path";

export default class PublicFileResponseBuilder extends ResponseBuilder {

    constructor(request, response , url){
        super(request, response, url, 200, 'text/html');  
    }

    prepareResponse(){
        super.prepareResponse();
    }

    buildResponse(){
        try{
            const file = path.join(process.cwd(), "public", this.url.pathname.replace("/public/", ""));
            
            accessSync(file ,constants.R_OK);

            const content = readFileSync(file);

            this.response.write(content);

        }
        catch(err){
            console.error("Erreur :", err.message);
            this.response.statusCode = 404;
            this.response.setHeader("Content-Type", "text/html");  // ✅ Changé de 'image/x-icon' en 'text/html'

            this.response.write('<h1>Error <span style="color: red;">404</span> : File not found </h1>');
        }
        finally {
            if (!this.response.writableEnded) {
                this.response.end();
            }
        }
    }
}