'use strict';
const https = require('https');

module.exports.elastic = (options, body, callback) => {


    let response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
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
        response.statusCode = 500;
        callback(response, null);
    });

    req.on('error', () => {
        response.statusCode = 503;
        callback(response, null);


    });

    req.write(JSON.stringify(body));
    req.end();
}