module.exports = function(arg, next){
  global.init1 = true;
  global.inits.push('init1');
  next();
};
