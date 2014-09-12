# should-check

node.js object check module using should.js

## About
You can check objects format (for example test cases..)



## Example
```js
var check = require('should-check');

var obj = {
  Model: ['prop1'],
  List: [':[Model]'],
  ModelListObj: ['list:[Model]']
};

var sc = check.init(obj);

sc.check('Model', {prop1: 'val1'});
sc.check('List', [{prop1: 'val1'}]);
sc.check('ModelListObj', {list: [{prop1: 'val1'}]});

var json = sc.checkJSON('Model', '{"prop1": "val1"}');
```

## API
### init(obj)
initialize and return SC object

### sc.check(name, target_obj)
compare target_obj and name of object

### sc.checkJSON(name, json_str)
parse json_str and compare the json and name of object.
Also return the parsed json object.
