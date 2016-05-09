/*
Binary Search Tree (unbalanced)
all elements to the left of the tree are smaller or equal to the parent

Insert
Delete
Balance - not implemented


*/

var BinarySearchTree = function() {
  this.root = null;
}

var Node = function(data, parent, left, right){
  if(data == null) { throw new Error("data must be valid"); }
  this.data = data;
  this.parent = parent ? parent : null;
  this.left = left ? left : null;
  this.right = right ? right : null;
}

BinarySearchTree.prototype.insert = function(data){
  if(data == null) { throw new Error("data must be valid"); }
  if(this.root == null) { 
    this.root = new Node(data); // if empty bst, just insert node
    return this;
  }

  var currNode = this.root;
  var prevNode = null;
  var tmp = 0;

  while(currNode !== null){ //now we need to find where to insert the node.. assuming it's sorted
    if(data < currNode.data){
      prevNode = currNode;
      currNode = currNode.left;
      tmp = 0;
    } else if (data > currNode.data){
      prevNode = currNode;
      currNode = currNode.right;
      tmp = 1;
    } else {
      throw new Error("duplicate data is not allowed")
    }
  }

  if(tmp){ //if right..
    prevNode.right = new Node(data, prevNode);
  } else { //if left..
    prevNode.left = new Node(data, prevNode);
  }

  return this;
}

var Test = require("./test.js");

var bst = new BinarySearchTree;
