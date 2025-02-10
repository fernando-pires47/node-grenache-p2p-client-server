function success(handler, ret) {
  handler.reply(null, ret) 
}

function error(handler, error) {
  handler.reply(error, null)
}

module.exports = { success, error };
