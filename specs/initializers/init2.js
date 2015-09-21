module.exports = function(arg, next){
  global.init2 = true;
  next();
};
