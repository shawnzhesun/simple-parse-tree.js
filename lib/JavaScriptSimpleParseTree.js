import { JavaScriptSimpleParseTreeNode } from './JavaScriptSimpleParseTreeNode.js';

/**
 * The class representing the simple parse tree.
 */
class JavaScriptSimpleParseTree {
  constructor(treeObj) {
    this.label = treeObj?.label;
    this.children = treeObj?.children || [];
  }

  /**
   * Print the source code from the simple parse tree.
   */
  printTreeToCode() {
    const queue = [];
    queue.push(this);
    const treeStack = [];
    while (queue.length > 0) {
      let currentNode = queue.pop();
      if (currentNode instanceof JavaScriptSimpleParseTreeNode) {
        const leadingText = currentNode.leading ? currentNode.leading : '';
        const trailingText = currentNode.trailing ? currentNode.trailing : '';
        treeStack.push(trailingText);
        treeStack.push(currentNode.token);
        treeStack.push(leadingText);
      } else if (currentNode instanceof JavaScriptSimpleParseTree) {
        currentNode.children.forEach((child) => {
          queue.push(child);
        });
      }
    }
    console.log(treeStack.reverse().join(''));
  }

  /**
   * The feature set of a simple parse tree for a code snippet contains the following elements:
   * 1. Token feature
   *    If a non-keyword token represents a local variable, use #VAR as the feature name.
   * 2. Parent feature
   *    The feature (L(t),i,n) represents the simple parse tree t's ith child contains the node with token n.
   * 3. Sibling feature
   *    The feature (L(t),n) represents the simple parse tree t's ith child contains the node with token n.
   * 4. (Consecutive) variable usage feature
   *    The feature ((i,L(t1),(j,L(t2))) represents the consecutive usage of a local varaible:
   *    once as the ith child of the tree t1, and once as the jth child of the tree t2.
   */
  generateFeatures() {
    const featureSet = [];

    const traverseTree = (treeNode) => {

    };
  }
}

export { JavaScriptSimpleParseTree };