import "./styles.css";
import { Tree, prettyPrint, randomArray } from "./binarySearchTree";
//import { function name } from "./jsFile";
//import odinImage from "./odin.png";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

// const pracTree = new Tree(randomArray(10, 100));
const pracTree = new Tree();

pracTree.insertNode(40);
pracTree.insertNode(20);
pracTree.insertNode(40);
pracTree.insertNode(60);
pracTree.insertNode(70);
pracTree.insertNode(60);
pracTree.insertNode(25);
pracTree.insertNode(10);
pracTree.insertNode(48);
pracTree.insertNode(47);
pracTree.insertNode(53);
pracTree.insertNode(68);
pracTree.insertNode(23);
pracTree.insertNode(33);
pracTree.insertNode(1);
pracTree.insertNode(85);
pracTree.insertNode(13);

prettyPrint(pracTree.root);

// pracTree.levelOrder(console.log);

// prettyPrint(pracTree.root);

// pracTree.levelOrderRec(console.log);
// pracTree.inOrder(console.log);
// pracTree.preOrder(console.log);
// pracTree.postOrder(console.log);
// pracTree.depth(20);
// pracTree.height(20);
console.log(pracTree.isBalanced());

pracTree.deleteNode(25);
pracTree.deleteNode(23);
pracTree.deleteNode(33);
prettyPrint(pracTree.root);
console.log(pracTree.isBalanced());
pracTree.rebalance();
prettyPrint(pracTree.root);
console.log(pracTree.isBalanced());
