var handler = require('../localidad');

handler.handler({pathParameters: {tipo: 'tipo_propiedad'}},{},(err,data)=>{
    console.log('err',err);
    console.log('data',data);
});
