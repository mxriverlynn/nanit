module.exports = function(arg, next){
  global.init1 = true;
  next();
};
