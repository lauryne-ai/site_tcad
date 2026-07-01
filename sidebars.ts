import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'welcome',
    {
      type: 'category',
      label: 'Setup',
      link: {type: 'doc', id: 'setup/index'},
      items: [
        'setup/installation',
        'setup/usage',
        'setup/troubleshooting',
        'setup/optimization',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/physics',
        'architecture/convergence',
        'architecture/data-formats',
        'architecture/modules',
      ],
    },
    'gallery',
    'tcad-integration',
    {
      type: 'category',
      label: 'Référence',
      items: ['reference/cli', 'reference/env'],
    },
    'resources',
    'contributing',
  ],
};

export default sidebars;
