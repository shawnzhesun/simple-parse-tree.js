import SyntaxTreeParser from '../lib/tree/SyntaxTreeParser';

describe('simple tree construction', () => {
  let input;
  let tree;

  beforeAll(() => {
    input = `
      var a = 1;
    `;
    tree = new SyntaxTreeParser(input).generateTree();
  });

  test('should construct a tree from the input source code', () => {
    expect(tree).toMatchObject({
      'label': '#',
      'children': [
        {
          'label': '#;',
          'children': [
            {
              'label': 'var#',
              'children': [
                {
                  'token': 'var',
                  'leading': '\n      ',
                  'trailing': ' ',
                },
                {
                  'label': '#=#',
                  'children': [
                    {
                      'token': 'a',
                      'isLeaf': true,
                      'isVariable': true,
                      'leading': ' ',
                      'trailing': ' ',
                    },
                    {
                      'token': '=',
                      'leading': ' ',
                      'trailing': ' ',
                    },
                    {
                      'token': '1',
                      'isLeaf': true,
                      'leading': ' ',
                    },
                  ],
                },
              ],
            },
            {
              'token': ';',
              'trailing': '\n    ',
            },
          ],
        },
      ],
    });
  });

  it('should be able to restore the original source code form the tree', () => {
    const code = tree.toSourceCode();
    expect(code).toEqual(`
      var a = 1;
    `);
  });
});