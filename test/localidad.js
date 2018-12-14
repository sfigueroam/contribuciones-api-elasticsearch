var handler = require('../localidad');


const event = {
    pathParameters: {
        tipo: 'localidad'
    }

};

handler.handler(event,{},(err,data)=>{
    console.log('err',err);
    console.log('data',data);
});
