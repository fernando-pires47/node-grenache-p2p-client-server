const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

function initServer() {
  const link = new Link({
    grape: 'http://127.0.0.1:30001'
  })
  link.start();
  
  const peer = new PeerRPCServer(link, {
    timeout: 300000
  })
  peer.init();

  const port = 1024 + Math.floor(Math.random() * 1000)
  const service = peer.transport('server')
  service.listen(port)
  return { service, link, peer };
}

module.exports = { initServer };