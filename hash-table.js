/*
Hash Table
getHash
add
remove
find
*/

var HashTable = function(m){
  if(isNaN(parseInt(m)) || parseInt(m) === 0){ throw new Error("please specify a valid number of buckets")}
  this.buckets = [];
  this.max = parseInt(m); //max number of buckets
}

HashTable.prototype.isNumeric = function(num){ //jQuery 2014 implementation
  return !Array.isArray(num) && (num - parseFloat(num) + 1) >= 0;
}


HashTable.prototype.getHash = function(word){ //javascript implementation of java's hashCode() method, taken from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
  if(word == null || word.length === 0) { throw new Error("word must be valid"); }

  var hash = 0;

  for(var i = 0; i < word.length; i++){
    var c = word.charCodeAt(i);
    hash = ((hash<<5)-hash) + c;
    hash = hash & hash;
  }
  return hash;
}

var Node = function(label, data){ //we use Nodes to store data
  if(label == null){ throw new Error("label must be valid"); }
  if(data == null){ throw new Error("data must be valid"); }
  this.label = label
  this.data = data;
}


HashTable.prototype.add = function(thing){

  var label = null, data = null, t = thing;

  if(Node.prototype.isPrototypeOf(thing)){
    label = thing.label;
    data = thing.data;
  } else if(Array.prototype.isPrototypeOf(thing)){ //validate label and data. Assume it's an array;
    if(thing[0] == null || thing[0].length === 0) { throw new Error("label must be valid"); }
    if(thing[1] == null){ throw new Error("data must be valid"); }
    t = new Node(thing[0], thing[1]);
    label = t.label;
    data = t.data;
  } else {
    throw new Error("you can only add arrays or Nodes");
  }

  var bucket = Math.abs(this.getHash(label) % this.max);

  if(this.buckets[bucket]){ //if the bucket already exists..
    this.buckets[bucket].push(t); 
  } else { //create new bucket
    this.buckets[bucket] = [t];
  }

  return this;

}

HashTable.prototype.find = function(word){
  if(word == null || word.length === 0){ throw new Error("key must be valid"); }

  var bucket = Math.abs(this.getHash(word) % this.max);

  if(!this.buckets[bucket]){ //bucket doesn't exist
    return "key not found";
  } else {

    for(var i = 0; i < this.buckets[bucket].length; i++){
      if(this.buckets[bucket][i].label === word){
        return this.buckets[bucket][i];
      }
    }

    return "key not found";

    ;
  }

}


HashTable.prototype.remove = function(word){
  if(word == null || word.length === 0){ throw new Error("key must be valid"); }

  if(this.find(word) !== "key not found"){
    var bucket = Math.abs(this.getHash(word) % this.max);
    for(var i = 0; i < this.buckets[bucket].length; i++){
      if(this.buckets[bucket][i].label === word){
        this.buckets[bucket].splice(i, 1);
        if(this.buckets[bucket].length === 0){ this.buckets.splice(bucket, 1)} //if bucket is empty, remove it
        break;
      }
    }

  }

  return this;
}


//test
var Test = require("./test.js");
var ht = new HashTable(4);
Test.assert(ht.getHash("asdfasdfasdf"), 489606812); //taken from java example;
Test.assert(ht.find("asdf"), "key not found");
ht.add(["asdfasdfasdf","three asdfs"]);
Test.assert(ht.find("asdfasdfasdf").data, "three asdfs");
ht.remove("asdfasdfasdf");
Test.assert(ht.buckets.length, 0);