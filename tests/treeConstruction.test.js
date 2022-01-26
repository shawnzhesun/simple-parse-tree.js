import SyntaxTreeParser from '../lib/tree/SyntaxTreeParser';

test('simple tree construction', () => {
  const input = `
    var a = 1;
  `;
  const tree = new SyntaxTreeParser(input).generateTree();
  expect(tree).toEqual({
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
                'leading': '\n    ',
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
            'trailing': '\n  ',
          },
        ],
      },
    ],
  });
});