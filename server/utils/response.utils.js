function error(ret) {
  return { success: false, error: ret }
}

function success(payload) {
  return { success: true, payload };
}

module.exports = { success, error };