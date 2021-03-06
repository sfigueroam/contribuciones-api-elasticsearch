'use strict';
var propiedades = require('./propiedades');
var localidad = require('./localidad');
var tipoPropiedades = require('./tipoPropiedades');

module.exports.handler =  (event, context, callback) => {


    if (event.pathParameters.tipo === 'localidad') {
        localidad.handler(event, context, callback)
    } else if (event.pathParameters.tipo === 'tipo_propiedad') {
        tipoPropiedades.handler(event, context, callback)
    } else if (event.pathParameters.tipo === 'propiedad') {
        propiedades.handler(event,context,callback);
    } else {
        console.log("ninguna de las anteriores");

        var body = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Go Serverless v1.0! Your function executed successfully!',
                input: event
            })
        };
        callback(null, body);
    }

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };

};
