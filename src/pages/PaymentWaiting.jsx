import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiStem } from "../utils/variables";

const PaymentWaiting = ({ setAlertMessage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tempProjectId = searchParams.get("tempProjectId");
  const target = searchParams.get("target");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const pollingInterval = 1000; // Check every 3 seconds
  const timeoutDuration = 3000; // Stop after 5 minutes (300 seconds)
  console.log("tempProjectId", tempProjectId);
  useEffect(() => {
    let isCancelled = false;
    let timeoutId;

    async function checkPaymentStatus() {
      try {
        const res = await fetch(
          `${apiStem}/payments/check-payment/${tempProjectId}`
        );
        const data = await res.json();
        console.log(data);
        if (isCancelled) return;

        if (data.status === "paid") {
          setStatus("confirmed");
        } else {
          timeoutId = setTimeout(checkPaymentStatus, pollingInterval);
        }
      } catch (err) {
        console.error("Error checking payment status:", err);
        if (isCancelled) return;
        setError("Payment confirmation failed. Please contact support.");
        setAlertMessage("Payment confirmation failed. Please contact support.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }

    // Start polling
    const pollingStart = Date.now();
    const pollingTimer = setTimeout(() => {
      if (Date.now() - pollingStart >= timeoutDuration) {
        setError("Payment confirmation timeout. Please contact support.");
        clearTimeout(timeoutId);
        setAlertMessage(
          "Payment confirmation timeout. Please contact support."
        );
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }, timeoutDuration);

    checkPaymentStatus();

    return () => {
      // Cleanup on component unmount
      isCancelled = true;
      clearTimeout(timeoutId);
      clearTimeout(pollingTimer);
    };
  }, [tempProjectId, pollingInterval, timeoutDuration]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "confirmed")
    setTimeout(
      () =>
        navigate(
          `/createNewProject?tempProjectId=${tempProjectId}&target=${target}`
        ),
      1000
    );
  if (error) return <p>{error}</p>;
  //probably unreachable but no harm leaving it in
  return <p>Waiting for payment confirmation...</p>;
};

export default PaymentWaiting;
