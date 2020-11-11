module.exports = {
  siteMetadata: {
    title: 'Alejandro García Serna',
    author: {
      name: 'Alejandro García Serna',
      summary: 'Thoughts about software engineering and life',
    },
    description: 'Thoughts about software engineering and life',
    siteUrl: 'https://alejandrogarciaserna.com',
    social: {
      twitter: 'alejogs4',
      github: 'alejogs4',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Alejandro García Serna',
        short_name: 'Alejandro García',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#A62D25',
        display: 'standalone',
        icon: 'content/assets/gatsby-icon.png',
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
  ],
};
