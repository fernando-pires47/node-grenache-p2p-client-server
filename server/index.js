'use strict'

const connection = require('./connection');
const router = require('./router');
const replyUtils = require('./utils/reply.utils');



let { service, link } = connection.initServer();

console.log(`*** App service started on port ${service.port} ***`)

setInterval(function () {
  for(let key in router.ROUTER){
    link.announce(key, service.port, {})
  }
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  console.log(`key: ${key}, payload: ${JSON.stringify(payload)}`);

  const service = router.ROUTER[key];
  if(! service) return replyUtils.error(handler, new Error('Request invalid.'))
  try{
    const response = service.handle(payload);
    if(response.success){
      return replyUtils.success(handler, response.payload);
    }
    console.error(`Error: ${JSON.stringify(response)}`);
    return replyUtils.error(handler, response.error); 
  }catch(e){
    console.error(e);
    replyUtils.error(handler, new Error('internal server error'));
  }
})