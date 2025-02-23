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

  findValue(value, root = this.root) {
    try {
      if (typeof value !== "number") {
        throw new Error("Argument must be number value");
      }

      if (!root) {
        return null;
      }

      if (value < root.value) {
        root = this.findValue(value, root.left);
      } else if (value > root.value) {
        root = this.findValue(value, root.right);
      }
      return root;
    } catch (e) {
      console.log(e.message);
      return 0;
    }
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

  /*
  Write a height(node) function that returns the given node’s height. 
  Height is defined as the number of edges in the longest path from a given node 
  to a leaf node. */
  height(node = this.root, bool = 1) {
    if (node != this.root) node = this.findValue(node);
    const height = this.levelOrderRec(node);
    if (bool === 1) {
      console.log(`node value ${node.value}'s height = ${height.length - 1}`);
    }
    return height.length - 1;
  }

  /*
  Write a depth(node) function that returns the given node’s depth. 
  Depth is defined as the number of edges in the path from a given node to 
  the tree’s root node.
  */
  depth(node) {
    console.log(
      `node value ${this.findValue(node).value}'s depth = ${this.height(this.root, 0) - this.height(node, 0)}`,
    );
    return this.height(this.root, 0) - this.height(node, 0);
  }

  isBalanced(root) {
    return this.isBalancedHelper(root) >= 0 ? true : false;
  }

  isBalancedHelper(root = this.root) {
    if (!root) return 0;

    let leftHeight = this.isBalancedHelper(root.left);
    let rightHeight = this.isBalancedHelper(root.right);

    if (
      leftHeight == -1 ||
      rightHeight == -1 ||
      Math.abs(leftHeight - rightHeight > 1)
    ) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    if (!this.isBalanced()) {
      this.root = this.buildTree(this.inOrder());
    }
  }

  inOrder(callback = null) {
    const root = this.root;
    let array = [];
    this.inOrderHelper(array, root);
    if (callback) {
      callback(array);
    }
    return array;
  }

  inOrderHelper(array, root) {
    if (!root) return;
    this.inOrderHelper(array, root.left);
    array.push(root.value);
    this.inOrderHelper(array, root.right);
  }

  preOrder(callback = null) {
    const root = this.root;
    let array = [];
    this.preOrderHelper(array, root);
    if (callback) {
      callback(array);
    }
    return array;
  }

  preOrderHelper(array, root) {
    if (!root) return;
    array.push(root.value);
    this.preOrderHelper(array, root.left);
    this.preOrderHelper(array, root.right);
  }

  postOrder(callback = null) {
    const root = this.root;
    let array = [];
    this.postOrderHelper(array, root);
    if (callback) {
      callback(array);
    }
    return array;
  }

  postOrderHelper(array, root) {
    if (!root) return;
    this.postOrderHelper(array, root.left);
    this.postOrderHelper(array, root.right);
    array.push(root.value);
  }

  //performs level order traversal and returns an array of all values.
  //requires a callback function that will be executed on each value
  levelOrder(root = this.root, callback = null) {
    if (!root) return;

    let queue = [];
    let values = [];

    queue.push(root);

    while (queue.length > 0) {
      let currentNode = queue.at(0);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      values.push(currentNode.value);
      if (callback) {
        callback(currentNode.value);
      }
      queue.shift();
    }
    return values;
  }

  levelOrderRec(root = this.root, callback = null) {
    let array = [];
    this.levelOrderRecHelper(array, root);
    if (callback) {
      callback(array);
    }
    return array;
  }

  levelOrderRecHelper(array, root = this.root, level = 0) {
    if (!root) return;
    if (array.length <= level) array.push([]);

    array[level].push(root.value);

    this.levelOrderRecHelper(array, root.left, level + 1);
    this.levelOrderRecHelper(array, root.right, level + 1);
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
