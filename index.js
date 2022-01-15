import antlr4 from 'antlr4';
import JavaScriptLexer from './lib/JavaScriptLexer.js';
import JavaScriptParser from './lib/JavaScriptParser.js';

// The input code snippet for testing
const input = `
  function mySum(init) {
    var foo = { bar: init };
    var sum = 0;
    if (foo.bar === 42) {
      for (let i = 0; i < foo.bar; i++) {
        sum++;
      }
    }
    return sum;
  }
`;

// Initializations
const chars = new antlr4.InputStream(input);
const lexer = new JavaScriptLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new JavaScriptParser(tokens);
parser.buildParseTrees = true;
const tree = parser.program();

const stringTree = tree.toStringTree(parser.ruleNames);
console.log(stringTree);
console.log(treeToText(makeTree(stringTree)));



/* ---- Util Functions -----  */

/**
 * Consutrct a JSON tree structure from the LISP stringified tree.
 * @param {string} input The stringified tree in the LISP format
 * @returns The tree structure represented in JSON format, with each node
 *          having its value and children nodes.
 */
function makeTree(input) {
  let root;
  let stack = [];
  let id = 0;
  let currentNode;
  for(let i = 0; i < input.length; i++) {
    if ((input.charAt(i) === '(' || input.charAt(i) === ')' ) && input.charAt(i - 1) == ' ' && input.charAt(i + 1) == ' ') {
      if (currentNode)
          currentNode.value = currentNode.value + input.charAt(i);
      continue;
    }
    switch (input.charAt(i)) {
      case '(': {
        const newNode = { id: id++, value: '', children: [] };
        if (id === 1)
          root = newNode;
        if (currentNode) {
            currentNode.children.push(newNode);
        }
        stack.push(newNode);
        currentNode = newNode;
        break;
      }
      case ')': {
        stack.pop();
        if (stack.length > 0) {
          currentNode = stack[stack.length - 1];
        }
        break;
      }
      default: {
        if (currentNode)
          currentNode.value = currentNode.value + input.charAt(i);
        break;
      }
    }
  }
  return root;
}

/**
 * Util functions to pretty-print the tree structure.
 * @param {object} treeRoot The root of the tree structure
 * @returns Pretty-printed tree structure
 */
function treeToText(treeRoot) {
  const recur = ({ id, value, children }) => id + ' ' + value +
      (children?.length ? '\n' + children.map(recur).map((text, i, {length}) =>
          i < length-1 ? '├──' + text.replace(/\n/g, '\n│  ')
                       : '└──' + text.replace(/\n/g, '\n   ')
      ).join('\n') : '');
  return [treeRoot].map(recur).join('\n');
}