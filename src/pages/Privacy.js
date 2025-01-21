import React from 'react';
import { Helmet } from 'react-helmet';
import './Privacy.css';

const Privacy = () => {
  return (
    <>
      {/* SEO Metadata using react-helmet */}
      <Helmet>
        <title>Privacy Policy | VinylFunders</title>
        <meta 
          name="description" 
          content="Learn about our privacy policy, including how we handle your data, IP rights, cookies, media, and embedded content on VinylFunders." 
        />
        <meta 
          name="keywords" 
          content="privacy policy, data protection, cookies, IP rights, data retention, soundonshape, VinylFunders" 
        />
      </Helmet>

      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <h2>Our Ethos</h2>
        <p>WE DO NOT TAKE ANY IP RIGHTS, WE DO NOT INFRINGE OTHERS' COPYRIGHT, WE WILL NOT PIRATE, AND WE WILL GET FULL PERMISSIONS.</p>

        <h3>Who We Are</h3>
        <p>
          We are a Sole Trader (trading as soundonshape.com). Our website address is: 
          <a href="https://soundonshape.com" target="_blank" rel="noopener noreferrer">
            https://soundonshape.com
          </a>.
        </p>

        <h3>Comments</h3>
        <p>
          When visitors leave comments on the site, we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. We will never share your data with third parties for commercial profit. An anonymised string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service Privacy Policy is available here: 
          <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer">
            https://automattic.com/privacy/
          </a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.
        </p>

        <h3>Media</h3>
        <p>
          If you upload images to the website, avoid uploading images with embedded location data (EXIF GPS) included.
        </p>

        <h3>Cookies</h3>
        <p>
          If you leave a comment on our site, you may opt in to saving your name, email address, and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
        </p>
        <p>
          If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
        </p>
        <p>
          When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
        </p>
        <p>
          If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after one day.
        </p>

        <h3>Embedded Content from Other Websites</h3>
        <p>
          Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction if you have an account and are logged in to that website.
        </p>

        <h3>Who We Share Your Data With</h3>
        <p>
          If you request a password reset, your IP address will be included in the reset email.
        </p>

        <h3>How Long We Retain Your Data</h3>
        <p>
          If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognise and approve any follow-up comments automatically instead of holding them in a moderation queue.
        </p>
        <p>
          For users that register on our website (if any), we store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
        </p>

        <h3>What Rights You Have Over Your Data</h3>
        <p>
          If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
        </p>

        <h3>Where Your Data Is Sent</h3>
        <p>
          Visitor comments may be checked through an automated spam detection service.
        </p>

        <p>We will outline our terms here.</p>
      </div>
    </>
  );
};

export default Privacy;
