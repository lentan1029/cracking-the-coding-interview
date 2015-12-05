/*
Linked list
Nodes

Create a linked list
  linked list has nodes, the "linking" of which will be done via linkedlist methods
  methods:
    push(Object)
    pop()
    shift()
    unshift(Object)
    hasCycle()
    inOrder(callback)
    length()

*/


var LinkedList = function() {
  this.start = null;
  this.end = null;
  this.length = 0;
}

LinkedList.prototype.add = function(data){
  if(data === undefined) {throw new Error('data must be valid');}

  var newNode = new Node(data);

  if(this.start === null) {
    this.start = newNode;
  } else {}
    this.end.next = newNode;
  }

  this.length++;
  this.end = newNode;

}

var Node = function(data) { 
  this.data = data;
  this.next = null;
}

//examples
var L = new LinkedList();
var A = new Node();
var B = new Node(A);

//tests
var Test = require("./test.js");
//Test.assert(A, B.next);
console.log(Object.getPrototypeOf(NaN))