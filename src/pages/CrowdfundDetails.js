// CrowdfundDetails.js
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CrowdfundDetails.css";
import { apiStem } from "../utils/variables";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { loadStripe } from "@stripe/stripe-js";

const PrintComponent = React.forwardRef(({ project }, ref) => (
  <div ref={ref} className="print-content">
    <h2>{project.projectTitle}</h2>
    <h3>{project.artist}</h3>
    <img
      src={`${apiStem}/images/thumb/${project.thumbArray[0]}`}
      alt={project.projectTitle}
      style={{ width: "400px", height: "auto" }}
    />
    <p>Crowdfund our new album here:</p>
    <QRCodeSVG value={window.location.href} size={400} level="H" />
  </div>
));
// Add display name to forwarded ref component
PrintComponent.displayName = "PrintComponent";

const CrowdfundDetails = ({ setAlertMessage }) => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [previewId, setPreviewId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51PzLeoEKvyVjwQKIqxe3hsiH0NTcK8YiqiS3DiNQWJw1pGf2q9TzNenKWPsILsWP4S7Tiv7eSrdpBVXGr8h8L6Ro000g9iEpGZ"
  );
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${apiStem}/projects/single/${id}`);

        setProject(response.data);
        const { songArray } = response.data;
        const preview = songArray.find((song) => song.preview === true);
        setPreviewId(preview.previewId);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    if (previewId) {
      fetch(`${apiStem}/songs/preview/${previewId}`)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          console.log("Blob URL:", url);
          console.log("blob", blob);
          setAudioUrl(url);
        })
        .catch((error) => console.log("Error creating blob URL:", error));
    }

    // Cleanup
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [previewId]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiStem}/funders/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId: "price_1QjMADEKvyVjwQKI8ruDHPXf", // Your Stripe price ID
            projectId: id,
          }),
        }
      );

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setAlertMessage("Payment initialization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!project) {
    return <p>Loading project details...</p>;
  }
  console.log(project);
  console.log(previewId);

  return (
    <div className="crowdfund-details-container">
      <h2>{project.projectTitle}</h2>
      <h3>{project.artist}</h3>
      <p>{project.description}</p>
      <div className="crowdfund-media">
        <img
          src={`${apiStem}/images/thumb/${project.thumbArray[0]}`}
          alt={`${project.artistName} artwork`}
          className="crowdfund-image"
        />
        {audioUrl && (
          <audio
            controls
            onLoadStart={() => console.log("Audio loading started")}
            onLoadedData={() => console.log("Audio data loaded")}
            onCanPlay={() => console.log("Audio can play")}
            onError={(e) => {
              console.log("Audio error event:", e);
              console.log("Audio element error:", e.target.error);
              console.log("Audio source:", e.target.src);
            }}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      <div className="funding-info">
        <p>Goal: £{project.fundTarget / 100}</p>
        <p>Raised: £{project.fundRaised / 100}</p>
        <p>Status: {project.status}</p>
        <p>Setup Date: {new Date(project.createdAt).toDateString()}</p>
        <p>
          Expiry Date:
          {(() => {
            const expiryDate = new Date(project.createdAt);
            expiryDate.setMonth(expiryDate.getMonth() + 6);
            return expiryDate.toDateString();
          })()}
        </p>
      </div>
      <Button
        variant="contained"
        onClick={() => handlePayment()}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Fund This Project £25"}
      </Button>
      <Button
        variant="outlined"
        startIcon={<PrintIcon />}
        onClick={handlePrint}
        className="no-print"
        sx={{ mt: 2 }}
      >
        Print QR Code
      </Button>

      <PrintComponent ref={printRef} project={project} />
    </div>
  );
};

export default CrowdfundDetails;
