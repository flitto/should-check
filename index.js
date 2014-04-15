var should = require('should');

var gObjs;

exports.init = function(objs) {
  gObjs = objs;
};

var check = exports.check = function(name, obj) {
  if (/[a-z]/.test(name[0])) {
    obj.should.be.type(name);
    return;
  }

  if (!gObjs)
    throw new Error('Please call init() with obj definitions before call check()!');

  if (!gObjs.hasOwnProperty(name))
    throw new Error(name + ' is not defined!');

  gObjs[name].forEach(function(prop){
    var arr = prop.split(':')
      , key = arr[0].trim()
      , val
      , type;

    if (key.length == 0) {
      obj.should.be.instanceOf(Array);

      type = arr[1].trim();
      type = type.replace('[', '').replace(']', '').trim();
      obj.forEach(function(o){
        check(type, o);
      });
      return;
    }

    obj.should.have.property(key);
    val = obj[key];

    if (arr.length > 1) {
      type = arr[1].trim();
      if (type[0] == '[') {
        val.should.be.instanceOf(Array);
        type = type.replace('[', '').replace(']', '').trim();

        val.forEach(function(o){
          check(type, o);
        });
      } else {
        check(type, val);
      }

    }
  });
};

exports.checkJSON = function(name, json_str) {
  var obj = JSON.parse(json_str);
  check(name, obj);
  return obj;
};
