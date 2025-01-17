import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <>
      <h1>Payment Failed</h1>
      <p>
        Sorry, your payment could not be processed. Please try again or contact
        support if the problem persists.
      </p>
      <Link to="/">Back to Home</Link>
    </>
  );
};

export default PaymentFailed;
