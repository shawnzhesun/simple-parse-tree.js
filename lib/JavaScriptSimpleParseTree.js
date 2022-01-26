import { JavaScriptSimpleParseTreeNode } from './JavaScriptSimpleParseTreeNode.js';

/**
 * The class representing the simple parse tree.
 */
class JavaScriptSimpleParseTree {
  constructor(treeObj) {
    this.label = treeObj?.label;
    this.children = treeObj?.children || [];
    this.features;
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
    const VAR_NAME = '#VAR';
    const featureSet = [];
    const leafTokens = [];
    const tokenUsageMap = {};
    const traverseTree = (_treeNode, _features, _leafTokens, _tokenUsageMap, _parents) => {
      if (_treeNode instanceof JavaScriptSimpleParseTreeNode && _treeNode.isLeaf === true) {
        let tokenName;
        if (_treeNode.isVariable === true)
          tokenName = VAR_NAME;
        else
          tokenName = _treeNode.token;

        // Generate the token feature
        _features.push(tokenName);

        // Generate the parent features
        _parents.forEach((parent) => {
          _features.push(`(${parent.label},${parent.childIndex},${tokenName})`);
        });

        // Gather data for computing sibling features
        _leafTokens.push(tokenName);

        // Gather data for computing variable usage features
        if (_treeNode.isVariable) {
          if (!_tokenUsageMap[_treeNode.token])
            _tokenUsageMap[_treeNode.token] = [];
          const parentNode = _parents[_parents.length - 1];
          _tokenUsageMap[_treeNode.token].push(`(${parentNode.childIndex},${parentNode.label})`);
        }
      } else if (_treeNode instanceof JavaScriptSimpleParseTree) {
        _treeNode.children.forEach((child, childIndex) => {
          _parents.push({
            label: _treeNode.label,
            childIndex: childIndex,
          });
          traverseTree(child, _features, _leafTokens, _tokenUsageMap, _parents);
          _parents.pop();
        });
      }

      return _leafTokens;
    };

    traverseTree(this, featureSet, leafTokens, tokenUsageMap, []);
    this.features = featureSet.concat(generateSiblingFeatures(leafTokens));
    this.features = this.features.concat(generateUsageFeatures(tokenUsageMap));
    return this.features;
  }
}

/**
 * @private
 * Generate the variable usage features from the token usage map.
 * @param {Map} tokenUsageMap The map representing the usages of the variables.
 */
function generateUsageFeatures(tokenUsageMap) {
  const tokens = Object.keys(tokenUsageMap);
  const usageFeatures = [];
  if (tokens && tokens.length > 0) {
    tokens.forEach((token) => {
      const tokenUsages = tokenUsageMap[token];
      for (let i = 0; i < tokenUsages.length - 1; i++) {
        usageFeatures.push(`(${tokenUsages[i]},${tokenUsages[i + 1]})`);
      }
    });
  }
  return usageFeatures;
}

/**
 * @private
 * Return sibling features from the list of leafTokens in the tree.
 * @param {Array} leafTokens Array containing all leaf nodes of the tree
 */
function generateSiblingFeatures(leafTokens) {
  const siblingFeatures = [];
  for (let i = 0; i < leafTokens.length - 1; i++) {
    siblingFeatures.push(`(${leafTokens[i]},${leafTokens[i + 1]})`);
  }
  return siblingFeatures;
}

export { JavaScriptSimpleParseTree };