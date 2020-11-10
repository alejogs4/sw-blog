import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  // const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <header className="bio">
      {/* <div className="bio-avatar-container">
        {avatar && (
          <Image
            fixed={avatar}
            alt={author?.name || ``}
            className="bio-avatar"
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        )}
      </div> */}
      {author?.name && (
        <>
          <p>
            {author?.summary || null}
            {' '}
          </p>
          <a href={`https://twitter.com/${social?.twitter || ''}`}>
            Twitter
          </a>
          {' '}
          <a href={`https://github.com/${social?.github || ''}`}>
            Github
          </a>
        </>
      )}
    </header>
  );
};

export default Bio;
