import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The APE Bridge',
  tagline: 'Pipeline automatisé Quantum ESPRESSO → TCAD',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://lauryneeklou.github.io',
  baseUrl: '/site_Tcad/',

  organizationName: 'LauryneEklou',
  projectName: 'site_Tcad',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    localeConfigs: {
      fr: {
        label: 'Français',
        direction: 'ltr',
      },
      en: {
        label: 'English',
        direction: 'ltr',
      },
    },
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl:
            'https://github.com/LauryneEklou/site_Tcad/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'APE Bridge',
      logo: {
        alt: 'APE Bridge Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/welcome',
          label: 'Welcome',
          position: 'left',
        },
        {
          to: '/docs/setup',
          label: 'Setup',
          position: 'left',
        },
        {
          to: '/docs/architecture/overview',
          label: 'Architecture',
          position: 'left',
        },
        {
          to: '/docs/gallery',
          label: 'Galerie',
          position: 'left',
        },
        {
          to: '/docs/resources',
          label: 'Ressources',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/LauryneEklou/QE_to_TCAD',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Welcome', to: '/docs/welcome'},
            {label: 'Installation', to: '/docs/setup/installation'},
            {label: 'Architecture', to: '/docs/architecture/overview'},
          ],
        },
        {
          title: 'Communauté',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/LauryneEklou/QE_to_TCAD/issues',
            },
            {
              label: 'Quantum ESPRESSO',
              href: 'https://www.quantum-espresso.org/',
            },
          ],
        },
        {
          title: 'Plus',
          items: [
            {label: 'Référence CLI', to: '/docs/reference/cli'},
            {label: 'Contribution', to: '/docs/contributing'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The APE Bridge — MIT License`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
