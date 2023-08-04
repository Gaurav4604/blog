// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "I am Gaurav.dev",
  tagline: "I love to code, bit by bit",
  favicon: "img/work.png",

  // Set the production url of your site here
  url: "https://iamgaurav.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/blog",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/sanji.png",
      navbar: {
        title: "My Site",
        logo: {
          alt: "My Site Logo",
          src: "img/idea.png",
          style: {
            width: "2rem",
            height: "2rem",
            borderRadius: "50%",
          },
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docSidebar",
            position: "left",
            label: "Blog",
          },

          {
            href: "https://github.com/Gaurav4604",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Socials",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/gaurav-singh-8737701a4/",
              },
              {
                label: "GitHub",
                href: "https://github.com/Gaurav4604",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Portfolio",
                to: "https://iamgaurav.info",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Gaurav4604, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
