"use strict";

import http from 'http';
import fs from 'fs';
import mime from 'mime-types';

let lookup = mime.lookup;

//const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    let path : string = req.url as string;
    console.log(__dirname);
    console.log(path);

    if(path === "/" || path === "/Home"){
        path = "/index.html";
    }

    let mime_type : string  = lookup(path.substring(1)) as string;

    fs.readFile(__dirname+path, function(err, data){

        if(err){
            res.writeHead(404);
            res.end("Error 404 - File Not Found " + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, {"Content-Type" : mime_type});
        res.end(data);

    });

    //res.statusCode = 200;
    //res.setHeader('Content-Type', 'text/plain');
    //res.end('Hello World');
});

server.listen(port, () => {
    console.log(`Server running at http://${port}:${port}/`);
});

