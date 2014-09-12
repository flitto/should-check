var should = require('should');

function init(gObj) {

  function check(name, obj) {
    if (!obj || typeof obj != 'object')
      throw new Error('arguments[1] must be an object');

    if (!gObj)
      throw new Error('Please call init() with obj definitions before call check()!');

    if (!gObj.hasOwnProperty(name))
      throw new Error(name + ' is not defined!');

    gObj[name].forEach(function(prop){
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
  }

  function checkJSON(name, json_str) {
    var obj = typeof json_str == 'string' ? JSON.parse(json_str) : json_str;
    check(name, obj);
    return obj;
  }

  return {
    check: check,
    checkJSON: checkJSON
  };
}

exports.init = init;

