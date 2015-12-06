/*
Trie - dictionary
insert
remove
find
*/


var Trie = function(){
  this.head = {};
}

Trie.prototype.add = function(word){
  if(word == undefined || typeof(word) !== "string" || word.length == 0){ throw new Error("word must be valid"); }
  
  var curr = this.head;

  for(var i = 0; i < word.length; i++){
    if(!curr[word[i]]) {
      curr[word[i]] = {};
    }
    curr = curr[word[i]];
  }

  if(curr["tail"]){
    throw new Error("word has already been added");
  } else {
    curr["tail"] = 1; //end of word marker
  }

}

Trie.prototype.find = function(word){
  if(word == undefined || typeof(word) !== "string" || word.length == 0){ throw new Error("word must be valid"); }

  var curr = this.head;

  for(var i = 0; i < word.length; i++){
    if(!curr[word[i]]){
      return "word not found"
    } else {
      curr = curr[word[i]];
    }
  }

  if(curr["tail"]){
    if(arguments[1] === "ref") {
      return curr;
    }
    return "word found";
  } else {
    return "word not found";
  }

}

Trie.prototype.delete = function(word){
  //recursively search through word, until we hit tail
  //backtrack: if parent has only one child, delete


}



//tests
var Test = require("./test.js");

var t = new Trie;
t.add("aaaa");
t.add("aaaaf");
Test.assert(t.find("aa"), "word not found");
Test.assert(t.find("aaaa"), "word found");
Test.assert(t.find("aaaaf"), "word found");
Test.assert(t["head"]["a"]["a"]["a"]["a"]["tail"], 1);
Test.assert(t["head"]["a"]["a"]["a"]["a"]["f"]["tail"], 1)

