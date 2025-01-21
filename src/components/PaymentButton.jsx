import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_publishable_key");

const PaymentButton = ({ amount, projectId }) => {
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      // Call your backend to create a checkout session
      const response = await fetch(`${apiStem}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          projectId,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handlePayment}>Support Project</button>;
};

export default PaymentButton;
