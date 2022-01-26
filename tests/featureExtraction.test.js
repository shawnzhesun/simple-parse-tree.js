import SyntaxTreeParser from '../lib/tree/SyntaxTreeParser';

describe('feature extraction', () => {
  test('extracts features from the tree', () => {
    const input = `
      if (x > 0) {
        x = -x;
      }
    `;
    const tree = new SyntaxTreeParser(input).generateTree();
    const featureSet = tree.generateFeatures();
    expect(featureSet).toEqual([
      '#VAR',
      '(#,0,#VAR)',
      '(if(#)#,2,#VAR)',
      '(#>#,0,#VAR)',
      '0',
      '(#,0,0)',
      '(if(#)#,2,0)',
      '(#>#,2,0)',
      '#VAR',
      '(#,0,#VAR)',
      '(if(#)#,4,#VAR)',
      '({#},1,#VAR)',
      '(#;,0,#VAR)',
      '(#=#,0,#VAR)',
      '#VAR',
      '(#,0,#VAR)',
      '(if(#)#,4,#VAR)',
      '({#},1,#VAR)',
      '(#;,0,#VAR)',
      '(#=#,2,#VAR)',
      '(-#,1,#VAR)',
      '(#VAR,0)',
      '(0,#VAR)',
      '(#VAR,#VAR)',
      '((0,#>#),(0,#=#))',
      '((0,#=#),(1,-#))',
    ]);
  });
});