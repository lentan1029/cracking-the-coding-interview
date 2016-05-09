var curry = function(fn){
  var expectedLength = fn.length;
  var storedArguments = [];//we store our arguments here
  var curriedFn = function(){ //we want to return a function that waits till it gets more arguments
    storedArguments = storedArguments.concat(Array.prototype.slice.call(arguments, 0))
    if (storedArguments.length >= expectedLength){ //when we finally get all our arguments, we call the function
      return fn.apply(this, storedArguments);
    } else {
      return curriedFn;
    }
  }
  return curriedFn;
}

function testFn(a, b, c, d, e, f, g){
  return a + b + c + d + e + f + g ;
}

function otherFn(a, b){
  return a + b;
}

//tests
var Test = require('./test.js');

Test.assert(isNaN(testFn(1,2,3,4)), true);
Test.assert(testFn(1,2,3,4,5,6,7), 28);
Test.assert(testFn.length, 7);
var curriedTestFn = curry(testFn);
var plusOne = curriedTestFn(1);
Test.assert(plusOne(2,3,4,5,6,7), 28);
var plusTen = curry(testFn)(1,2,3);
Test.assert(plusTen(4,5,6,7), 28);