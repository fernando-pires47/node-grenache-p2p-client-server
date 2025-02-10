

function isDateValid(date) {
  try{
    new Date(date);
    return true;
  }catch(err){
    return false;
  }
}

module.exports = { isDateValid };
