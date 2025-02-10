
const hashUtils = require('./utils/hash.utils');

function initBoot(peer) {
  setInterval(() => {
    const price = Math.floor(Math.random() * 100 + 1);
    const startTransaction = Math.random() > 0.5 ? 'buy' : 'sell';
    const idTranBuy = hashUtils.generateHash12();
    const idTranSell = hashUtils.generateHash12();
    const idE2e = hashUtils.generateHash12();

    const dhCri = new Date();

    const buyTransaction = {
      idTran: idTranBuy,
      idTranRef: idTranSell,
      idE2e: idE2e,
      type: 'buy',
      price: price,
      cliIdentity: `00001`,
      agency: `BANK ${Math.random()}`,
      dhCreated: dhCri,
    };

    const sellTransaction = {
      idTran: idTranSell,
      idTranRef: idTranBuy,
      idE2e: idE2e,
      type: 'sell',
      price: price,
      cliIdentity: `00000`,
      agency: `BANK ${Math.random()}`,
      dhCreated: dhCri,
    };

    let transactionsTransaction = [];

    if(startTransaction == 'buy'){
      transactionsTransaction = [buyTransaction, sellTransaction];
    }else if(startTransaction == 'sell'){
      transactionsTransaction = [sellTransaction, buyTransaction];
    }

    transactionsTransaction.forEach(object => {
      peer.request('transaction', object, { timeout: 30000 }, (err, data) => {
        if (err) {
          console.error(`## idTran: ${object.idTran}, idE2e: ${object.idE2e} ##`);
          console.error(err);
        }

        console.log(`## idTran: ${object.idTran}, idE2e: ${object.idE2e}, price: ${object.price} ##`);
        console.log(data)
      })
    })
  }, 3000);
}

module.exports = { initBoot };

