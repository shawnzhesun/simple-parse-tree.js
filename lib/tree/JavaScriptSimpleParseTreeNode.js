class JavaScriptSimpleParseTreeNode {
  constructor(nodeObj) {
    this.token = nodeObj?.token;
    this.isLeaf = nodeObj?.isLeaf;
    this.isVariable = nodeObj?.isVariable;
    this.leading = nodeObj?.leading;
    this.trailing = nodeObj?.trailing;
  }
}

export default JavaScriptSimpleParseTreeNode;