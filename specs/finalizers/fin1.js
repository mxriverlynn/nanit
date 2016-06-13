module.exports = function(arg, next){
  global.fin1 = true;
  global.fins.push('fin1');
  next();
};
