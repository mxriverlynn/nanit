module.exports = function(arg, next){
  global.fin1 = true;
  next();
};
