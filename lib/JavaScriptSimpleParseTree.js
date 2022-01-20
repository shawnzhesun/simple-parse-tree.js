/**
 * The class representing the tree node in the simple parse tree.
 */
class JavaScriptSimpleParseTreeNode {
  constructor(nodeObj) {
    this.isLeaf = nodeObj?.isLeaf;
    this.token = nodeObj?.token;
    this.leading = nodeObj?.leading;
    this.trailing = nodeObj?.trailing;
  }
}

/**
 * The class representing the simple parse tree.
 */
class JavaScriptSimpleParseTree {
  constructor(treeObj) {
    this.label = treeObj?.label;
    this.children = treeObj?.children || [];
  }
}

export { JavaScriptSimpleParseTreeNode, JavaScriptSimpleParseTree };