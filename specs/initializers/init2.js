module.exports = function(arg, next){
  global.init2 = true;
  global.inits.push('init2');
  next();
};
