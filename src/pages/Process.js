import React from "react";
import { Helmet } from "react-helmet";
import "./Process.css";

const Process = () => {
  return (
    <>
      {/* SEO Metadata using react-helmet */}
      <Helmet>
        <title>Our Process | VinylFunders</title>
        <meta
          name="description"
          content="Learn about the process for creating, funding, and supporting vinyl crowdfunding projects on VinylFunders. Understand each step from launch to delivery."
        />
        <meta
          name="keywords"
          content="vinyl crowdfunding process, vinyl pressing, artist funding, vinyl projects, crowdfunding support"
        />
      </Helmet>

      <div className="process-container">
        <h1>Our Process</h1>
        <h2>How It Works</h2>
        <p>
          Welcome to our platform! We make it simple to create, fund, and
          support vinyl crowdfunding projects. Below is a detailed overview of
          how the process works from start to finish. Whether you are an artist
          looking to launch a project or a backer interested in supporting
          creative music, we’ve got you covered.
        </p>

        <h3>Step 1: Creating Your Crowdfund Project</h3>
        <p>
          If you're an artist, you can{" "}
          <a href="/press-vinyl">create a new crowdfunding project</a> by
          providing details about your vinyl record, including album art and
          music samples.
        </p>

        <h3>Step 2: Launch and Promotion</h3>
        <p>
          Once your project is set up, it's time to launch! Use social media and
          other platforms to spread the word. You can direct potential backers
          to view your project in the{" "}
          <a href="/crowdfunding-gallery">Crowdfunding Gallery</a>.
        </p>

        <h3>Step 3: Backing the Project</h3>
        <p>
          Backers can browse projects and pledge their support. Once a funding
          goal is reached, we move forward with pressing the vinyl.
        </p>

        <h3>Step 4: Production and Delivery</h3>
        <p>
          Once fully funded, we initiate the vinyl pressing. Backers will
          receive their copies, and any extra copies will be sent to you, the
          creator.
        </p>

        <h3>Want to Learn More?</h3>
        <p>
          For more details, please visit our <a href="/faq">FAQ page</a> or{" "}
          <a href="/contact">contact us</a> directly. We are happy to help!
        </p>
      </div>
    </>
  );
};

export default Process;
