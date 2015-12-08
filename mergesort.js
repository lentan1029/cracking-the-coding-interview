function Mergesort(arr, cmp){
  if(!Array.isArray(arr)){ return new Error("array must be valid"); }
  if(typeof(cmp) !== "function" || cmp.length !== 2) { throw new Error("comparator function must be valid"); }

  function ms(a, b, cmp){ //mergesort (based on comparator)
    if(typeof(cmp) !== "function" || cmp.length !== 2) { throw new Error("comparator function must be valid"); }
    
    var tmp = [], i = 0, j = 0;

    while(a[i] !== undefined || b[j] !== undefined){ //stops when both are undefined
      
      if(a[i] === undefined){
        tmp = tmp.concat(b.slice(j, b.length));
        j=b.length;
      } else if (b[j] === undefined){
        tmp = tmp.concat(a.slice(i, a.length));
        i=a.length;
      } else {
        if(cmp(a[i],b[j])){ //if comparator returns a as the "larger" of the two
          tmp.push(a[i]);
          i++;
        } else if(!cmp(a[i],b[j])){
          tmp.push(b[j]);
          j++;
        }
      }
    }

    return tmp;
  }

  function splitter(arr, cmp){ //splits array into half
    if(arr.length === 1){
      return arr;
    }

    var arr1 = splitter(arr.slice(0,~~(arr.length/2)), cmp);
    var arr2 = splitter(arr.slice(~~(arr.length/2), arr.length), cmp);

//console.log(ms(arr1, arr2, cmp))
    return ms(arr1, arr2, cmp);
  }

  return splitter(arr,cmp);
}

//test
var Test = require("./test.js");
Test.assert(Mergesort([1,5,3,7,8,2,4,6], (a,b) => {return a < b}).toString(), [1,2,3,4,5,6,7,8].toString());
Test.assert(Mergesort([1,5,3,7,8,9,2,4,6], (a,b) => {return a > b}).toString(), [9,8,7,6,5,4,3,2,1].toString());