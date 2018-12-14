'use strict';
const requestElastic = require('./request').elastic;

module.exports.handler = (event, context, callback) => {

    const eventBody = JSON.parse(event.body);
    console.log('buscando propiedades', event);
    console.log('eventBody', eventBody);
    console.log('event.body.search', eventBody.search);
    console.log('event.body.tipoPropiedad', eventBody.tipoPropiedad);
    console.log('event.body.size', eventBody.size);

    const search = eventBody.search.replace(',', ' ');
    const body = {size:{}, query: {bool: {must: []}}};
    const tipoPropiedad = eventBody.tipoPropiedad;
    const size = eventBody.size;

    body.size = size;
    body.from = 0;
    body.query.bool.must = [];


    const direccion = {
        'match': {
            'direccion': {
                'query': search,
                'operator': 'and'
            }
        }
    };

    body.query.bool.must.push(direccion);

    if (tipoPropiedad) {
        const searchPropiedad = {
            'match': {
                'id_dest_propiedad': {
                    'query': tipoPropiedad
                }
            }
        };
        body.query.bool.must.push(searchPropiedad);
    }

    const options = {
        host: process.env.elasticsearchUrl,
        path: '/propiedades/_search',
        method: 'POST',
        port: 443,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log("body", JSON.stringify(body));
    requestElastic(options, body, callback)

}