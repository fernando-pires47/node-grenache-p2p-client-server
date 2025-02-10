
function generateHash12() {
  return Math.random().toString(36).substring(2, 14);
}

module.exports = { generateHash12 };