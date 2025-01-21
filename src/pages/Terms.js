import React from 'react';
import { Helmet } from 'react-helmet';
import './Terms.css';

const Terms = () => {
  return (
    <>
      {/* SEO Metadata using react-helmet */}
      <Helmet>
        <title>Conditions of Sale | VinylFunders</title>
        <meta 
          name="description" 
          content="Read our conditions of sale for creating, funding, and supporting vinyl crowdfunding projects on VinylFunders. Understand our simple and transparent process." 
        />
        <meta 
          name="keywords" 
          content="vinyl crowdfunding, conditions of sale, crowdfunding terms, artist funding, vinyl pressing, vinyl funders" 
        />
      </Helmet>

      <div className="terms-container">
        <h1>Conditions of Sale</h1>
        <h2>How It Works</h2>
        <p>
          Welcome to our platform! We make it simple to create, fund, and support vinyl crowdfunding projects. Below is a detailed overview of how the process works from start to finish. Whether you are an artist looking to launch a project or a backer interested in supporting creative music, we’ve got you covered.
        </p>

        <h3>Getting Started</h3>
        <p>
          To begin, you can <a href="/createcrowdfund">create a new crowdfunding project</a> to raise funds for your vinyl pressing. Our platform provides the tools needed to easily manage your campaign and reach your supporters.
        </p>

        <h3>Supporting a Campaign</h3>
        <p>
          Backers can browse through <a href="/crowdfunding-gallery">our crowdfunding gallery</a> and choose the projects they want to support. Each contribution brings the project closer to completion, helping bring vinyl records to life.
        </p>

        <h3>Fees and Refunds</h3>
        <p>
          We charge a flat 5% fee on all transactions. In case the funding target is not met, backers will receive a refund minus this fee. For more information, please see our <a href="/faq">FAQ</a>.
        </p>
      </div>
    </>
  );
};

export default Terms;
