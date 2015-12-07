/*
Stack
push
pop
peek
isEmpty
clear
*/

var LinkedList = require("./linked-list.js");

var Stack = function(){
  this.l = new LinkedList.LinkedList();
  this.length = this.l.length;
}

Stack.prototype.push = function(data){
  this.l.add(data);
  this.length = this.l.length;
}

Stack.prototype.pop = function(){
  this.l.remove(this.l.start.data);
  this.length = this.l.length;
}

Stack.prototype.isEmpty = function(){
  return this.length === 0;
}

Stack.prototype.peek = function(){
  if(!this.isEmpty()){
    return this.l.start;
  }
}

Stack.prototype.clear = function(){
  this.l = new LinkedList.LinkedList();
  this.length = this.l.length;
}

//tests
var Test = require("./test.js");

var s = new Stack();
s.push("thing");
Test.assert(s.length, 1);
Test.assert(s.peek().data, "thing");
s.pop();
Test.assert(s.length, 0);
