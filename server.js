const http = require('http');

const requestListener = (request, response) => {
    
    const { method, url } = request;

    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    if (url === '/') {
        if(method === 'GET') {
            response.end('Ini adalah Homepage');
        } else {
            response.end(`Halaman tidak dapat diakses dengan ${method} request`);
        }
    }else if (url === '/about') {
        if(method === 'GET') {
            response.end('Halo! Ini adalah halaman about');
        } else if(method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                let { name } = JSON.parse(body);
                response.end(`Halo, ${name}! Ini adalah halaman about `);
            })
        } else {
            response.end(`Halaman tidak dapat diakses dengan ${method} request`);
        }
    } else {
        response.end(`Halaman tidak ditemukan !`);
    }

}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server Berjalan pada http://${host}:${port}`);
})