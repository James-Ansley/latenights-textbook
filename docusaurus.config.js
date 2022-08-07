const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/oceanicNext');

const math = require('remark-math');
const katex = require('rehype-katex');

const config = {
    title: 'LateNights',
    url: 'https://textbook.latenights.me',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'favicon.ico',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                theme: {customCss: require.resolve('./src/css/custom.scss')},
            }),
        ],
    ],

    plugins: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                hashed: true,
                indexBlog: false,
                indexPages: true,
            },
        ],
        'docusaurus-plugin-sass',
    ],

    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    themeConfig:
        ({
            docs: {
                sidebar: {
                    hideable: true,
                }
            },
            metadata: [{
                name: 'keywords',
                content: 'python, data structures, algorithms, late nights, latenights, textbook'
            }],
            navbar: {
                title: 'LateNights',
                logo: {
                    alt: 'My Site Logo',
                    src: 'logo.svg',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Textbook',
                    },
                ],
            },
            tableOfContents: {
                minHeadingLevel: 2,
                maxHeadingLevel: 4,
            },
            footer: {
                style: 'dark',
                copyright: `Copyright © ${new Date().getFullYear()} LateNights, Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                showLineNumbers: true,
            },
        }),

};

module.exports = config;
