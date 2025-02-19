import "./styles.css";
import { Tree, prettyPrint } from "./binarySearchTree";
//import { function name } from "./jsFile";
//import odinImage from "./odin.png";

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

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
pracTree.insertNode(1);
pracTree.insertNode(85);
pracTree.insertNode(13);

prettyPrint(pracTree.root);

pracTree.deleteNode(60);
pracTree.deleteNode(48);
pracTree.deleteNode(20);

prettyPrint(pracTree.root);
