function Quicksort(arr, cmp){
  if(arr.length <= 1){ return arr; } //if array is of length 1 or 0, it is sorted\
  if(typeof(cmp) !== "function" || cmp.length !== 2) { 
    throw new Error("comparator function must be valid"); 
  }

  //get pivot
  var pivot = arr[arr.length - 1];
  var wall = 0

  for(var i = 0; i < arr.length - 1; i++){
    if(cmp(arr[i],pivot)) { //if "greater" than pivot, swap with first elem to the right of the wall, and increment wall
      var tmp = arr[i];
      arr[i] = arr[wall];
      arr[wall] = tmp;
      wall++;
    }
  }

  

  return Quicksort(arr.slice(0, wall), cmp)
  .concat(pivot)
  .concat(Quicksort(arr.slice(wall,arr.length - 1), cmp));
}


//tests
var Test = require("./test.js");
Test.assert(Quicksort([1,3,2,5,6,4,7,9,8], (a,b) => {return a > b}).toString(), [9,8,7,6,5,4,3,2,1].toString());
