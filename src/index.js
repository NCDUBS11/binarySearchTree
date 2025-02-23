import "./styles.css";
import { Tree, prettyPrint, randomArray } from "./binarySearchTree";
//import { function name } from "./jsFile";
//import odinImage from "./odin.png";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

// const pracTree = new Tree(randomArray(10, 100));
const pracTree = new Tree(randomArray(20, 99));
prettyPrint(pracTree.root);

console.log(`Is balanced?: ${pracTree.isBalanced()}`);
console.log(`Level Order: ${pracTree.levelOrderRec()}`);
console.log(`Pre Order: ${pracTree.preOrder()}`);
console.log(`Post Order: ${pracTree.postOrder()}`);
console.log(`In Order: ${pracTree.inOrder()}`);

let newNums = randomArray(10, 999);

newNums.forEach((value) => {
  pracTree.insertNode(value);
});

prettyPrint(pracTree.root);

console.log(`Is balanced?: ${pracTree.isBalanced()}`);
pracTree.rebalance();
console.log(`Tree rebalanced.`);
console.log(`Is balanced?: ${pracTree.isBalanced()}`);
console.log(`Level Order: ${pracTree.levelOrderRec()}`);
console.log(`Pre Order: ${pracTree.preOrder()}`);
console.log(`Post Order: ${pracTree.postOrder()}`);
console.log(`In Order: ${pracTree.inOrder()}`);

prettyPrint(pracTree.root);
