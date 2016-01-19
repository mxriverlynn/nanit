module.exports = function(arg, next){
  global.fin2 = true;
  next();
};
