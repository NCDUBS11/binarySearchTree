/* 
==Node class w/ data, left, right attributes

==Tree class - accepts an array, has a root attribute which uses return value of buildTree function

==buildTree(array) - takes array, sorts it, removes duplicates and creates a balanced binary tree consisting of Node objects. This should return the level-0 root node.
--complete sorting through mergeSort(array) helper function

==randomArray(length) - generates an array of specified length filled w/ random numbers
*/

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree(array) {
    //takes array an turns it into a balanced binary tree filled w/ Nodes.
    //requires sort and duplicateRemoval helper functions
  }
}

//Generate random array for input to functions for testing
function randomArray(length, range = 100) {
  if (typeof length == "number" && typeof range == "number") {
    let newArray = [];
    length = Math.floor(length);
    for (let i = 0; i < length; i++) {
      newArray.push(Math.floor(Math.random() * range));
    }
    return newArray;
  }
  throw new Error("Arguments must be of 'number' type.");
}

//merge sort function, original array length may not equal output array length
//due to duplicates being sorted out in helper function merge.
function mergeSort(array) {
  if (array.length <= 1) return array;

  const start = array.indexOf(array[0]);
  const end = array.length - 1;
  const middle = Math.ceil((end - start) / 2);

  const leftArray = mergeSort(array.toSpliced(middle, end));
  const rightArray = mergeSort(array.toSpliced(start, middle));

  return merge(leftArray, rightArray);
}

//helper function used in mergeSort that checks for duplicates
// and merges in a sorted fashion (low->high).
function merge(left, right) {
  let mergedArray = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      if (mergedArray.at(-1) !== left[0]) {
        mergedArray.push(left[0]);
      }
      left.splice(0, 1);
    } else {
      if (mergedArray.at(-1) !== right[0]) {
        mergedArray.push(right[0]);
      }
      right.splice(0, 1);
    }
  }
  while (left.length > 0) {
    if (mergedArray.at(-1) !== left[0]) {
      mergedArray.push(left[0]);
    }
    left.splice(0, 1);
  }
  while (right.length > 0) {
    if (mergedArray.at(-1) !== right[0]) {
      mergedArray.push(right[0]);
    }
    right.splice(0, 1);
  }
  return mergedArray;
}
