/* 
==Node class w/ data, left, right attributes

==Tree class - accepts an array, has a root attribute which uses return value of buildTree function

==buildTree(array) - takes array, sorts it, removes duplicates and creates a balanced binary tree consisting of Node objects. This should return the level-0 root node.
--complete sorting through mergeSort(array) helper function

*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array = null) {
    this.root = this.buildTree(mergeSort(array));
  }

  buildTree(array) {
    if (array === null) return null;
    /*
    1) init start = 0, end = arr.length -1, mid = (start+end)/2
    2) Create tree node with mid as root (called A in this example)
    3)Recursively do steps 4 & 5
    4)Calc mid of left subarray and make it root of left subtree of A
    5)Calc mid of right subarray and make it root of right subtree of A
    */
    let start = 0;
    let end = array.length - 1;
    let middle = Math.ceil(end / 2);

    if (end < 0) return null;

    const treeNode = new Node(array[middle]);

    treeNode.left = this.buildTree(array.slice(start, middle));
    treeNode.right = this.buildTree(array.slice(middle + 1));

    return treeNode;
  }

  insertNode(value, root = this.root) {
    try {
      if (typeof value !== "number") {
        throw new Error("Node value must be a number");
      }

      if (!this.root) {
        this.root = new Node(value);
        return;
      }

      if (!root) {
        return new Node(value);
      }

      if (value < root.value) {
        root.left = this.insertNode(value, root.left);
        return root;
      } else if (value > root.value) {
        root.right = this.insertNode(value, root.right);
        return root;
      }
      throw new Error(`Value [${value}] already exists or is invalid.`);
    } catch (e) {
      console.log(e);
      return root;
    }
  }

  deleteNode(value, root = this.root) {
    //Need to find value
    //no root, value < root, value > root OR value found
    //once found next actions depend on number of children
    //none-remove node, 1 child-connect child to grandparent,
    //2 children-findMin of next largest branch and swap with target

    if (!root) {
      root = null;
    }

    if (value < root.value) {
      root.left = this.deleteNode(value, root.left);
    } else if (value > root.value) {
      root.right = this.deleteNode(value, root.right);
    } else {
      if (!root.left && !root.right) {
        root = null;
      } else if (!root.left) {
        root = root.right;
      } else if (!root.right) {
        root = root.left;
      } else {
        let tempRoot = this.findMin(root.right);
        root.value = tempRoot.value;
        root.right = this.deleteNode(tempRoot.value, root.right);
      }
    }
    return root;
  }

  findMin(root = this.root) {
    try {
      if (!root) {
        throw new Error("Invalid argument");
      }

      while (root.left) {
        root = root.left;
      }
      return root;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }
}

//Generate random array for input to functions for testing
export function randomArray(length = 10, range = 20) {
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
  if (array === null) return null;

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

//===================================================================================

// let array = randomArray(10, 200);

// console.log(mergeSort(array));

// const newTree = new Tree(array);

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// prettyPrint(newTree.root);
