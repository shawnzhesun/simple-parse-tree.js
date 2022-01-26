import SyntaxTreeParser from './lib/tree/SyntaxTreeParser.js';

/* ---- The Input Code -----  */
const input = `
  if (x > 0) x = -x;
`;

// Print the simple parse tree structure
const parseTree = new SyntaxTreeParser(input).generateTree();

// Print the constructed simple parse tree
console.log(JSON.stringify(parseTree, null, '   '));

// Print features of the generated parse tree
console.log(parseTree.generateFeatures());
