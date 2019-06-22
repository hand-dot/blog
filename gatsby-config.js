const SENTRY_DSN_URL = process.env.SENTRY_DSN_URL || "none";
console.log(`variable SENTRY_DSN_URL is : '${SENTRY_DSN_URL}'`);
const GOOGLE_ANALYTICS_TRACKING_ID =
  process.env.GOOGLE_ANALYTICS_TRACKING_ID || "none";
console.log(
  `variable GOOGLE_ANALYTICS_TRACKING_ID is : '${GOOGLE_ANALYTICS_TRACKING_ID}'`
);
const GOOGLE_TAGMANAGER_ID = process.env.GOOGLE_TAGMANAGER_ID || "none";
console.log(`variable GOOGLE_TAGMANAGER_ID is : '${GOOGLE_TAGMANAGER_ID}'`);
const HOTJAR_ID = process.env.HOTJAR_ID || "none";
console.log(`variable HOTJAR_ID is : '${HOTJAR_ID}'`);
const HOTJAR_SNIPPET_VERSION = process.env.HOTJAR_SNIPPET_VERSION || "none";
console.log(`variable HOTJAR_SNIPPET_VERSION is : '${HOTJAR_SNIPPET_VERSION}'`);
const HEADWAY_ACCOUNT = process.env.HEADWAY_ACCOUNT || "none";
console.log(`variable HEADWAY_ACCOUNT is : '${HEADWAY_ACCOUNT}'`);

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://hand-dot.com";

module.exports = {
  siteMetadata: {
    lang: "ja",
    title: "hand-dot.com",
    description:
      "hand-dot.comはプログラマー,デザイナーのための情報を発信・解説するメディアです。",
    canonicalUrl: BASE_URL,
    image:
      "https://repository-images.githubusercontent.com/183037985/a0345380-6b6a-11e9-91aa-2aea8dab60a0",
    author: {
      name: "hand-dot",
      minibio: `
        <strong>hand-dot</strong>は東京都内在住のJavascriptが好きな開発者です。`
    },
    organization: {
      name: "hand-dot.com",
      url: BASE_URL,
      logo:
        "https://repository-images.githubusercontent.com/183037985/a0345380-6b6a-11e9-91aa-2aea8dab60a0"
    },
    social: {
      twitter: "@hand_dot",
      fbAppID: ""
    },
    thirdParty: {
      headway: HEADWAY_ACCOUNT
    }
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960
            }
          },
          `gatsby-remark-code-titles`,
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              inlineCodeMarker: "÷"
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank"
            }
          },
          "gatsby-remark-copy-linked-files"
        ]
      }
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn: SENTRY_DSN_URL
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GOOGLE_ANALYTICS_TRACKING_ID,
        cookieDomain: "hand-dot.com"
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: GOOGLE_TAGMANAGER_ID
      }
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: +HOTJAR_ID,
        sv: +HOTJAR_SNIPPET_VERSION
      }
    },
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
