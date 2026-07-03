import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'The APE Bridge',
  tagline: 'Pipeline automatisé Quantum ESPRESSO → TCAD',
  favicon: 'img/favicon.ico',

  url: 'https://lauryne-ai.github.io',
  baseUrl: '/site_tcad/',
  organizationName: 'lauryne-ai',
  projectName: 'site_tcad',
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
            'https://github.com/lauryne-ai/site_tcad/tree/main/',
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
          type: 'doc',
          docId: 'welcome',
          position: 'left',
          label: 'Welcome',
        },
        {
          type: 'doc',
          docId: 'setup/index',
          position: 'left',
          label: 'Setup',
        },
        {
          type: 'doc',
          docId: 'architecture/overview',
          position: 'left',
          label: 'Architecture',
        },
        {
          type: 'doc',
          docId: 'gallery',
          position: 'left',
          label: 'Galerie',
        },
        {
          type: 'doc',
          docId: 'resources',
          position: 'left',
          label: 'Ressources',
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
      darkTheme: prismThemes.nightOwl,
      additionalLanguages: ['bash', 'python', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
