var ex = require('chai').expect;
describe("An AngularJS test suite", function(){

  var sum = function(obj){
    obj();
  };

  it("Jasmine", function(){
    expect(true).toBe(true);
  })

  it('mocha chai', function(){
    assert.equal(true, true);
  })

  it('mocha chai should', function(){
    var test = 'var';
    test.should.be.a('string');
  })

  it('sinon', function(){

    var spy = sinon.spy();

    sum(spy);

    console.log(spy.called);
    console.log(spy.callCount);
    //spy.calledWith(arg1);
    //spy.threw();
    //spy.returned(obj);
    //spy.calledBefore(spy);
    //spy.calledAfter(spy);
  })

  it('mocha chai expect', function(){

    ex('foo').to.equal('foo');
  })


})

