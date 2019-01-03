'use strict';
const https = require('https');

function obtenerHeaders (){
    const accessControlAllowOrigin = process.env.accessControlAllowOrigin;
    if (accessControlAllowOrigin) {
        return {
            'Access-Control-Allow-Origin': accessControlAllowOrigin, // Required for CORS support to work
            'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
    } else {
        return undefined;
    }

}

module.exports.elastic = (options, body, callback) => {

    let response = {
        statusCode: 200,
        headers: obtenerHeaders(),
        body: null,
    };

    let responseChunks = [];

    console.log("Enviando Request");
    console.log("Body", body);

    let req = https.request(options, (res) => {
        res.on('data', (d) => {
            responseChunks.push(d);
        });
    });

    req.on('close', () => {
        response.body = responseChunks.join('');
        console.log('Respuesta', response.body);
        callback(null, response);
    });

    req.on('abort', () => {
        console.error('Error en request', response);
        response.statusCode = 500;
        callback(response, null);
    });

    req.on('error', (err) => {
        console.error('Error en requesta', err);
        response.statusCode = 503;
        callback(response, null);
    });

    req.write(JSON.stringify(body));
    req.end();
}