const replyUtils = require('../../../utils/response.utils');
const buyTransactionService = require('./buy-transaction.service');
const sellTransactionService = require('./sell-transaction.service');

const SERVICES = {
  'buy': buyTransactionService,
  'sell': sellTransactionService
}

function handle(payload) {
  try{
    if(!['buy', 'sell'].includes(payload.type)){
      return replyUtils.error(new Error('invalid type'));
    }
   
    return SERVICES[payload.type].handle(payload);
  }catch(err){
    throw err;
  }
}

module.exports = { handle, SERVICES };