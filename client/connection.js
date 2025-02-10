const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

function initClient() {
  const link = new Link({
    grape: 'http://127.0.0.1:30001'
  })
  link.start()
  
  const peer = new PeerRPCClient(link, {})
  peer.init()
  return { link, peer };
}

module.exports = { initClient };