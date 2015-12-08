/*
Singleton
only one of these things can exist.
taken from http://robdodson.me/javascript-design-patterns-singleton/

*/

function notSingleton(){
  //dummy function;
}

function User() {  
  //basically, when we create the first User, we add a new property to the constructor function
  //this property points to the very first User that was created
  //subsequent calls to User check if that property is defined and returns that property, which is a reference to the first User  

  if (typeof User.instance === 'object') { 
      return User.instance;
  }
  this.data = "data";

  User.instance = this;

  return this; 
}


function User2() {  
  //the first time we run it, it creates a new User2 object 
  //we rewrite the constructor such that it is now a function that returns the reference to the first User2 object
  //we copy the prototype and constructor over to the new constructor that we wrote

  var instance;

  //rewrite the constructor so it can't be called again to create new objects
  User2 = function() { //creates a closure that returns the reference to the first object
      return instance;
  };

  //the prototype needs to be copied over.
  User2.prototype = this;

  // the instance
  instance = new User2();

  //the constructor pointer is messed up so we reset the constructor pointer
  instance.constructor = User2;

  // all the functionality
  instance.data = "data";

  return instance; 
}

var User3; 
//same idea, we overwrite the constructor to return a reference to instance
//seems cleaner than User2
(function(){

  var instance;

  User3 = function(){
    if(instance){
      return instance;
    }
  }

  instance = this;
  instance.data = "data";

})();



//tests
var Test = require("./test.js");

var a = new notSingleton();
var b = new notSingleton();
Test.assert(a===b,false);

a = new User();
b = new User();
Test.assert(a,b);

a = new User2();
b = new User2();
Test.assert(a,b);

a = new User3();
b = new User3();
Test.assert(a,b)
