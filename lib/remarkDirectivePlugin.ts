import { visit } from 'unist-util-visit';

export default function remarkDirectivePlugin() {
  return (tree: any) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const hName = node.type === 'textDirective' ? 'span' : 'div';
        
        if (node.name === 'tip') {
          const data = node.data || (node.data = {});
          data.hName = hName;
          data.hProperties = { 
            className: 'custom-tip-box',
            'data-title': node.attributes?.title
          };
        }
        if (node.name === 'warning') {
          const data = node.data || (node.data = {});
          data.hName = hName;
          data.hProperties = { 
            className: 'custom-warning-box',
            'data-title': node.attributes?.title
          };
        }
        if (node.name === 'note') {
          const data = node.data || (node.data = {});
          data.hName = hName;
          data.hProperties = { 
            className: 'custom-note-box',
            'data-title': node.attributes?.title
          };
        }
        if (node.name === 'step') {
          const data = node.data || (node.data = {});
          data.hName = hName;
          data.hProperties = { 
            className: 'custom-step-block',
            'data-number': node.attributes?.number || '1',
            'data-title': node.attributes?.title || 'Step'
          };
        }
        if (node.name === 'cta') {
          const data = node.data || (node.data = {});
          data.hName = hName;
          data.hProperties = { 
            className: 'custom-cta-block',
            'data-title': node.attributes?.title || 'Ready?',
            'data-link': node.attributes?.link || '/',
            'data-button': node.attributes?.button || 'Click Here'
          };
        }
      }
    });
  };
}
