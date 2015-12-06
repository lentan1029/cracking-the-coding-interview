/* 
Splay Tree
splay
insert
find
delete
*/

var SplayTree = function() {
  this.root = null;
}

var Node = function(data, parent, left, right){
  if(data == null) { throw new Error("data must be valid"); }
  this.data = data;
  this.parent = parent ? parent : null;
  this.left = left ? left : null;
  this.right = right ? right : null;
}

SplayTree.prototype.splay = function (node){

//      D          b
//    b   E  ->  A   D
//   A C            C E
  function rotateRight(node){        
    var grandparent = node.parent.parent;
    var right = node.right;
    node.parent.left = right;
    node.parent.parent = node;
    node.right = node.parent;
    node.parent = grandparent;
  }

//     B            d 
//   A   d   ->   B   E
//      C E      A C    
  function rotateLeft(node){
    var grandparent = node.parent.parent;
    var left = node.left;
    node.parent.right = left;
    node.parent.parent = node;
    node.left = node.parent;
    node.parent = grandparent;
  }


  function zigzag(node, type){ //rotate node twice
    if(type == "left-right"){ //optimise?
      rotateLeft(node);
      rotateRight(node);
    } else if (type == "right-left"){
      rotateRight(node);
      rotateLeft(node);
    }
  }

  function zigzig(node, type){ //rotate parent first, then rotate node
    if(type == "left-left"){
      rotateRight(node.parent);
      rotateRight(node);
    } else if (type == "right-right"){
      rotateLeft(node.parent);
      rotateLeft(node);
    }
  }

  function zig(node){
    if(node.parent.left === node){ //if node is a left child of current root
      rotateRight(node);
    } else if (node.parent.right === node){
      rotateLeft(node);
    }
  }

  while(node.parent && node.parent.parent){
    if(node.parent.parent.left){
      if(node.parent.parent.left.right === node){
        zigzag(node, "left-right");
      } else if(node.parent.parent.left.left === node){
        zigzig(node, "left-left");
      }
    } else if(node.parent.parent.right){
      if(node.parent.parent.right.right === node){
        zigzig(node, "right-right");
      } else if(node.parent.parent.right.left === node){
        zigzag(node, "right-left");
      }
    }
  }

  if(node.parent){
    zig(node);
  }

  this.root = node;
}

SplayTree.prototype.insert = function (data){
  if(data == null) { throw new Error("data must be valid"); }
  if(this.root == null) { 
    this.root = new Node(data); // if empty bst, just insert node
    return this;
  }

  var currNode = this.root;
  var prevNode = null;
  var tmp = 0;

  while(currNode !== null){
    if(data < currNode.data){
      prevNode = currNode;
      currNode = currNode.left;
      tmp = 0;
    } else if (data > currNode.data){
      prevNode = currNode;
      currNode = currNode.right;
      tmp = 1;
    } else {
      this.splay(currNode);
      throw new Error("duplicate data is not allowed")
    }
  }

  if(tmp){ //if right..
    prevNode.right = new Node(data, prevNode);
    this.splay(prevNode.right);
  } else { //if left..
    prevNode.left = new Node(data, prevNode);
    this.splay(prevNode.left);
  }

  return this;
}


//tests
var Test = require('./test.js');

var st = new SplayTree();
st.insert("asdf");
Test.assert(st.root.data, "asdf");
st.insert("aaaa");
Test.assert(st.root.data, "aaaa");
Test.assert(st.root.right.data, "asdf");
st.insert("zzzz");
Test.assert(st.root.data, "zzzz");
Test.assert(st.root.left.left.data, "aaaa");
//console.log("reached here");

//console.log(st);


