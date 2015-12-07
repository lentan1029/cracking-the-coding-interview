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

(function(exports){

  var LinkedList = function() {
    this.start = null;
    this.end = null;
    this.length = 0;
  }

  LinkedList.prototype.add = function(data){
    if(data == undefined) { throw new Error('data must be valid'); } //does not accept null data

    var newNode = new Node(data);

    if(this.start === null) {
      this.start = newNode;
    } else {
      this.end.next = newNode;
    }

    this.length++;
    this.end = newNode;

  }

  LinkedList.prototype.remove = function(data){
    if(data == undefined) { throw new Error('data must be valid'); }
    if(this.start === null) { throw new Error('there is no data in the linked list'); }

    var prevNode = null;
    var currNode = this.start;

    while(currNode !== null && data !== currNode.data){
      prevNode = currNode;
      currNode = currNode.next;
    }

    if(currNode){ //if data is found
      if(prevNode){ //if currNode is not the very first Node
        if(currNode.next){//if currNode is not the very last Node
          prevNode.next = currNode.next //then we are in the middle of the linkedlist
        } else { //currNode is the very last Node
          this.end = prevNode;
        }
      } else { //if currNode is the very first Node
        if(this.end === this.start){ //if currNode is also the last Node
          this.end = null;
        }
        this.start = currNode.next;
      }
      this.length--;
    } else {
      throw new Error('data not found!');
    }

  }

  var Node = function(data) { 
    this.data = data;
    this.next = null;
  }

  //tests
  //var Test = require("./test.js");
  //Test.assert(A, B.next);
  /*var L = new LinkedList();
  L.add("hello");
  L.add("it's");
  L.add("me");
  L.add("...again");
  Test.assert(L.length, 4);
  L.remove("me");
  Test.assert(L.start.next.next.data, "...again");
  Test.assert(L.length, 3);*/

  exports.LinkedList = LinkedList;

})(this);

