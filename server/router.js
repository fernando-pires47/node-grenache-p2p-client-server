const transactionService = require('./services/domain/transaction/transaction.service');

const ROUTER =  {
  'transaction': transactionService
} 

module.exports = { ROUTER };