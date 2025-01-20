import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import { loadStripe } from "@stripe/stripe-js";
import "./PressVinyl.css";
import { apiStem } from "../utils/variables";
import { Tooltip, Button } from "@mui/material";
import { Link } from "react-router-dom";
function PressVinyl() {
  const [loading, setLoading] = useState(false);
  const [hasActiveProject, setHasActiveProject] = useState(false);

  useEffect(() => {
    const active = JSON.parse(localStorage.getItem("activeProject"));
    setHasActiveProject(!!active && active.active);
  }, []);

  const stripePromise = loadStripe(
    "pk_test_51PzLeoEKvyVjwQKIqxe3hsiH0NTcK8YiqiS3DiNQWJw1pGf2q9TzNenKWPsILsWP4S7Tiv7eSrdpBVXGr8h8L6Ro000g9iEpGZ"
  ); // Replace with your actual Stripe publishable key
  const handlePayment = async (priceId, target) => {
    try {
      setLoading(true);
      const tempProjectId = uuidv4(); // Generate a unique tempProjectId

      // Get Stripe instance
      const stripe = await stripePromise;

      // Call backend to create a checkout session
      const response = await fetch(
        `${apiStem}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            tempProjectId,
            target,
          }),
        }
      );
      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = (text, onClick) => (
    <Tooltip
      title={
        hasActiveProject ? "Please complete your active project first" : ""
      }
    >
      <span>
        <Button
          variant="contained"
          onClick={onClick}
          disabled={hasActiveProject || loading}
          sx={{ m: 1 }}
        >
          {loading ? "Processing..." : text}
        </Button>
      </span>
    </Tooltip>
  );

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

        <div className="press-vinyl-container">
          <h1 className="page-title">Press Your Vinyl with VinylFunders</h1>
          <h2>One-Time Mastering Fee - Then Set a Crowdfund to Press Vinyl!</h2>
          {hasActiveProject && (
            <p>
              <Link to="/createNewProject">Complete Your Active Project</Link>
            </p>
          )}
          {/* Add payment buttons */}
          <div className="pricing-options">
            {/* <button
              onClick={() =>
                handlePayment("price_1Qhtn4EKvyVjwQKIQB8ZVP1k", 100000)
              } //price id and target to raise in pence
              disabled={loading}
            >
              Standard Package - £99
            </button>

            <button onClick={() => handlePayment("#")} disabled={loading}>
              Premium Package - £199
            </button>
          </div> */}
            {/* <div> */}

            {renderButton("Press 50 Records", () =>
              handlePayment("price_1Qhtn4EKvyVjwQKIQB8ZVP1k", 100000)
            )}
            {renderButton("Press 100 Records", () =>
              handlePayment("price_100", 200000)
            )}
            {renderButton(
              "Press 300 Records",
              () => handlePayment("price_300"),
              600000
            )}
          </div>

          {loading && <p>Processing payment...</p>}
        </div>
      </div>
    </>
  );
}

export default PressVinyl;
