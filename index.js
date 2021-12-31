import antlr4 from 'antlr4';
import JavaScriptLexer from './lib/JavaScriptLexer.js';
import JavaScriptParser from './lib/JavaScriptParser.js';

const input = 'var foo = {bar: 42}';
const chars = new antlr4.InputStream(input);
const lexer = new JavaScriptLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new JavaScriptParser(tokens);
parser.buildParseTrees = true;
const tree = parser.program();

console.log(tree.toStringTree(parser.ruleNames));