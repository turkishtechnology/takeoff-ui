import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import dotenv from 'dotenv';
import tailwindPlugin from './plugins/tailwind.config.cjs';

dotenv.config();

const config: Config = {
  title: 'Takeoff UI',
  tagline: 'Turkish Technology Frontend Frontend Component Library',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://takeoffui.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'turkishtechnology', // Usually your GitHub org/user name.
  projectName: 'takeoff-ui', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  plugins: [
    tailwindPlugin,
    function myDevtoolPlugin() {
      return {
        name: 'my-devtool-plugin',
        configureWebpack() {
          return { devtool: 'eval-source-map' };
        },
      };
    },
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.

          sidebarCollapsed: false,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/takeoff-og.jpg',
    navbar: {
      // title: "Takeoff UI",
      logo: {
        alt: 'Takeoff UI Logo',
        src: 'img/navbar-logo.svg',
        srcDark: 'img/navbar-logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          to: 'https://github.com/turkishtechnology/takeoff-ui/releases',
          label: 'v0.5.0',
          position: 'right',
        },
        {
          href: 'https://github.com/turkishtechnology/takeoff-ui',
          label: 'Github',
          position: 'right',
        },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
      ],
      hideOnScroll: true,
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Installation',
              href: '/docs/Installation',
            },
            {
              label: 'Components',
              href: '/docs/Components/Overview',
            },
            {
              label: 'Tailwind Plugin',
              href: '/docs/Tailwind',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Contribution Guide',
              href: '/contribution-guide',
            },
            {
              label: 'Release Notes',
              href: 'https://github.com/turkishtechnology/takeoff-ui/releases',
            },
            {
              label: 'FAQs',
              href: '/faqs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Contact',
              to: '/contact',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Takeoff UI`,
    },
    prism: {
      theme: prismThemes.vsDark,
      // additionalLanguages: ["powershell"],
      magicComments: [
        {
          className: 'code-block-deprecated-usage',
          line: 'before',
          block: { start: 'before-start', end: 'before-end' },
        },
        {
          className: 'code-block-new-usage',
          line: 'after',
          block: { start: 'after-start', end: 'after-end' },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
