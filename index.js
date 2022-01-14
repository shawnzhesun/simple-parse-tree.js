import antlr4 from 'antlr4';
import JavaScriptLexer from './lib/JavaScriptLexer.js';
import JavaScriptParser from './lib/JavaScriptParser.js';

// The input code snippet for testing
const input = `
  var foo = { bar: 42 };
`;

// Initializations
const chars = new antlr4.InputStream(input);
const lexer = new JavaScriptLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new JavaScriptParser(tokens);
parser.buildParseTrees = true;
const tree = parser.program();

const stringTree = tree.toStringTree(parser.ruleNames);
// console.log(stringTree);
console.log(treeToText(makeTree(stringTree)));



/* ---- Util Functions -----  */

/**
 * Consutrct a JSON tree structure from the LISP stringified tree.
 * @param {string} input The stringified tree in the LISP format
 * @returns The tree structure represented in JSON format, with each node
 *          having its value and children nodes.
 */
function makeTree(input) {
  let res = [];
  let stack = [];
  let id = 0;
  let currentNode;
  for(let i = 0; i < input.length; i++) {
    switch (input.charAt(i)) {
      case '(': {
        const newNode = { id: id++, value: '', children: [] };
        if (stack.length > 0 && currentNode)
          currentNode.children.push(newNode);
        stack.push(newNode);
        currentNode = newNode;
        break;
      }
      case ')': {
        res.push(stack.pop());
        if (stack.length > 0)
          currentNode = stack[stack.length - 1];
        break;
      }
      default: {
        if (currentNode)
          currentNode.value = currentNode.value + input.charAt(i);
        break;
      }
    }
  }
  return res.filter(n => n.id === 0);
}

/**
 * Util functions to pretty-print the tree structure.
 * @param {object} tree The tree structure represented in JSON
 * @returns Pretty-printed tree structure
 */
function treeToText(tree) {
  const recur = ({ value, children }) => value +
      (children?.length ? '\n' + children.map(recur).map((text, i, {length}) =>
          i < length-1 ? '├──' + text.replace(/\n/g, '\n│  ')
                       : '└──' + text.replace(/\n/g, '\n   ')
      ).join('\n') : '');
  return tree.map(recur).join('\n');
}