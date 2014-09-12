var check = require('../');

var sc;

var obj = {
  Model: ['prop1'],
  List: [':[Model]'],
  ModelListObj: ['list:[Model]']
};

var model = {prop1: '111'}
  , list = [{prop1: '333'}]
  , modelListObj= {list:[{prop1: '222'}]};

describe('Test should-check', function() {

  it('init()', function(done) {
    sc = check.init(obj);
    sc.should.have.property('check');
    sc.should.have.property('checkJSON');
    done();
  });

  it('check', function(done) {
    sc.check('Model', model);
    sc.check('List', list);
    sc.check('ModelListObj', modelListObj);
    done();
  });

  it('checkJSON', function(done) {
    sc.checkJSON('Model', JSON.stringify(model));
    sc.checkJSON('List', JSON.stringify(list));
    sc.checkJSON('ModelListObj', JSON.stringify(modelListObj));
    done();
  });

  it('check (cause error)', function(done) {
    var err;
    try {
      sc.check('Model', {});
    } catch (e) {
      err = true;
    }
    err.should.be.true;
    done();
  });

  it('checkJSON (cause error)', function(done) {
    var err;
    try {
      sc.checkJSON('LIST', JSON.stringify([1, 2, 3]));
    } catch (e) {
      err = true;
    }
    err.should.be.true;
    done();
  });
});
