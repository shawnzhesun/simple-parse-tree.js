import SyntaxTreeParser from './lib/tree/SyntaxTreeParser.js';
import JavaScriptSimpleParseTree from './lib/tree/JavaScriptSimpleParseTree.js';

/* ---- The Input Code -----  */
const input = `
  /**
   * Some comment from the first function
   */
  function sum(arg1, arg2) {
    var p1 = Person.make({
      age: arg1,
    });
    var p2 = Person.make({
      age: arg2,
    });
    return p1.age + p2.age;
  }
`;

// Print the simple parse tree structure
const parseTree1 = new SyntaxTreeParser(input).generateTree();

// Print the constructed simple parse tree
// console.log(JSON.stringify(parseTree1, null, '   '));

// Print features of the generated parse tree
// console.log(parseTree1.generateFeatures());

const parseTree2 = new SyntaxTreeParser(`
  /**
   * Some comments from the second function
   * Additional text...
   */
  function sumUserAge(age1, age2) {
    var person1 = User.make({
      age: age1,
    });
    var person2 = Person.make({
      age: age2,
    });
    return person1.age + person2.age;
  }
`).generateTree();

console.log('Similarity Score: ' + JavaScriptSimpleParseTree.computeSimilarityScore(parseTree1, parseTree2));