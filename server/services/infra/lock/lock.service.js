

const LOCK = [];

function isLocked(key, id) {
  const index = LOCK.findIndex(row => row.key === key && row.id == id);
  if(index != -1) return true;
  return false;
}

function add(key, id){
  LOCK.push({ key, id });
}

function remove(key, id){
  const index = LOCK.findIndex(row => row.key === key && row.id == id);
  if (index != -1) LOCK.splice(index, 1); 
}

module.exports = { isLocked, add, remove };
