// import { useEffect } from "react";
import { Helmet } from "react-helmet";
import "./PressVinyl.css";

function PressVinyl() {
  // useEffect(() => {
  //   // Dynamically load Stripe script
  //   const script = document.createElement("script");
  //   script.src = "https://js.stripe.com/v3/pricing-table.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <>
      {/* SEO Metadata using react-helmet */}
      <Helmet>
        <title>Press Your Vinyl | VinylFunders</title>
        <meta
          name="description"
          content="Press your vinyl records through crowdfunding. Pay a one-time mastering fee and let VinylFunders handle pressing, packaging, and distribution for your project."
        />
        <meta
          name="keywords"
          content="press vinyl, crowdfunding vinyl, record release, vinyl pressing, mastering fee, crowdfunding project"
        />
      </Helmet>

      <div className="press-vinyl-container">
        <h1 className="page-title">Press Your Vinyl with VinylFunders</h1>
        <h2>One-Time Mastering Fee - Then Set a Crowdfund to Press Vinyl!</h2>
        <p>
          Choose your desired record release number and set up a crowdfunding
          project. We handle the rest: Pressing | Packaging | Distribution. It's
          easy & great value. If you don't reach your crowdfunding target, all
          your donors are refunded their money (terms and conditions apply).
        </p>

        {/* Stripe Pricing Table */}
        {/* <stripe-pricing-table
          pricing-table-id="prctbl_1PzewxEKvyVjwQKItUrmizvz"
          publishable-key="pk_live_51PzLeoEKvyVjwQKIaIvuD8m2gQRDO5dWigUdS5ODin72KDZT4LS41cHe3SLAGkQgLaCUMZzHEQPcSeJgjU6EUMI000w7ruyXfB">
        </stripe-pricing-table> */}
      </div>
    </>
  );
}

export default PressVinyl;
