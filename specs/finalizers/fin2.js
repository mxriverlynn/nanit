module.exports = function(arg, next){
  global.fin2 = true;
  global.fins.push('fin2');
  next();
};
