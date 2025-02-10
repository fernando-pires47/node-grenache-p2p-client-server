const replyUtils = require('../../../utils/response.utils');
const { TRANSACTIONS } = require('../../../constants/transaction.constant');
const lockService = require('../../infra/lock/lock.service');

const lockKey = 'buy-transaction';

function handle(payload) {
  try{
    if(lockService.isLocked()) return replyUtils.error(new Error('already processing transaction'));
    lockService.add(lockKey, payload.idTran);

    if(! payload) return replyUtils.error(new Error('undefined paylod'));
  
    if(payload.type != 'buy') return replyUtils.error(new Error('invalid type'));
  
    if(! payload.price) return replyUtils.error(new Error('undefined price'));
    if(Number(payload.price) <= 0) return replyUtils.error(new Error('undefined price'));

    const transactionsByIdE2e = TRANSACTIONS.filter(p => p.idE2e == payload.idE2e);

    // cannot exist sell and buy transactions
    const isTransactionFinished = transactionsByIdE2e.length > 1;
    if(isTransactionFinished) return replyUtils.error(new Error('transaction finished'));

    // cannot exist another buy transaction for this e2e
    const alreadyExistSellTranByType = transactionsByIdE2e.find(p => p.type == 'buy');
    if(alreadyExistSellTranByType) return replyUtils.error(new Error('buy transaction already exist'));

    // cannot exist another tran with the same reference
    const alreadyExistTranRef = transactionsByIdE2e.find(p => p.idTranRef == payload.idTranRef);
    if(alreadyExistTranRef) return replyUtils.error(new Error('reference already exist'));

    // if the sell tran has another ref, it's wrong 
    const tranExistentRefForMe = transactionsByIdE2e.find(p => p.idTranRef != payload.idTran);
    if(tranExistentRefForMe) return replyUtils.error(new Error('invalid transaction'));

    TRANSACTIONS.push({
      idTran: payload.idTran,
      idTranRef: payload.idTranRef,
      idE2e: payload.idE2e,
      type: payload.type,
      price: payload.price,
      cliIdentity: payload.cliIdentity,
      agency: payload.agency,
      dhCreated: payload.dhCreated,
      dhFinished: new Date()
    });

    return replyUtils.success('Created buy transaction successfully');
  }finally {
    lockService.remove(lockKey, payload.idTran);
  }
}

module.exports = { handle };