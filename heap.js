/*
Heap (array representation)
Insert (bubble up)
Delete (bubble down)

Get parent: ~~(n / 2) 
Get sibling: (n % 2) ? n - 1 : n + 1
Get children: n * 2 || n * 2 + 1
*/

var Heap = function(cmp){
  if(cmp == null){ throw new Error("a valid comparator function must be provided"); }

  //example cmp function (max heap):
  //function(parent,child){
  //  return parent >= child; 
  //}

  this.cmp = cmp;
  this.data = [];
  this.length = 0;
}

Heap.prototype.insert = function(item){
  if(item == null){ throw new Error("data must be valid"); }
  this.data.push(item);

  // bubble up
  var n = this.data.length;

  function i(n){ //returns index in this.data, given n
    return n - 1;
  }

  while(
    i(n) !== 0 && //if we are currently not at root
    !this.cmp(this.data[i(~~(n/2))], this.data[i(n)]) //and if ordering is not satisfied
  ){ //then swap
    var tmp = this.data[i(~~(n/2))]; 
    this.data[i(~~(n/2))] = this.data[i(n)];
    this.data[i(n)] = tmp;
    n = ~~(n/2);
  }

  return this;
}

Heap.prototype.isSatisfied = function(){

  function i(n){
    return n-1;
  }

  for(var n = this.data.length; n > 1; n--){
    if(!this.cmp(this.data[i(~~(n/2))], this.data[i(n)])) { return false }
  }

  return true;
}

Heap.prototype.remove = function(item){

  function i(n){
    return n-1;
  }

  var n = this.data.indexOf(item) + 1;

  if(n){
    this.data.splice(n - 1, 1, this.data[this.data.length-1]);
    this.data.pop();

    //bubble down
    while(n * 2 < this.data.length){ //terminate when we have no more children
      var leftChild = this.data[i(n*2)];
      var rightChild = this.data[i(n*2+1)];

      //swap with the biggest

      if(this.cmp(leftChild, rightChild) || rightChild == null){ //if leftChild > rightChild
        if(!this.cmp(this.data[i(n)], this.data[i(n*2)])){ //if ordering not satsified
          var tmp = this.data[i(n)];
          this.data[i(n)] = this.data[i(n*2)];
          this.data[i(n*2)] = tmp;
          n = n * 2;
        } else {
          break; //ordering satisfied, exit
        }
      } else {
        if(!this.cmp(this.data[i(n)], this.data[i(n*2+1)])){
          var tmp = this.data[i(n)];
          this.data[i(n)] = this.data[i(n*2+1)];
          this.data[i(n*2+1)] = tmp;
          n = n*2+1;
        } else {
          break;
        }
      }

    }

  }

  return this;

}


//tests
var Test = require("./test.js");

var H = new Heap((a,b) => a > b);

[1,2,3,4,7,8,9,10,14,16,17].map((item)=>H.insert(item));

Test.assert(H.isSatisfied(), true);
Test.assert(H.isSatisfied(), true);