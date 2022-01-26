class JavaScriptSimpleParseTreeNode {
  constructor(nodeObj) {
    this.token = nodeObj?.token;
    this.isLeaf = nodeObj?.isLeaf;
    this.isVariable = nodeObj?.isVariable;
    this.isCapitalized = nodeObj?.isCapitalized;
    this.leading = nodeObj?.leading;
    this.trailing = nodeObj?.trailing;
  }
}

export default JavaScriptSimpleParseTreeNode;