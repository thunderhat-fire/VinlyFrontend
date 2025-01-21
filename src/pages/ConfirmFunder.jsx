import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Box,
  Container,
  Alert,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { apiStem } from "../utils/variables";

const ConfirmFunder = ({ setAlertMessage }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paymentRef = searchParams.get("paymentRef");

  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmFunder = async () => {
      try {
        console.log("confirming funder");
        const response = await fetch(`${apiStem}/funders/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentRef }),
        });
        const data = await response.json();
        data.status === "paid" ? setStatus("success") : setStatus("error");
      } catch (err) {
        setStatus("error");
        setError(err.message);
        setAlertMessage("Confirmation failed. Please try again.");
      }
    };

    confirmFunder();
  }, [setAlertMessage]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        {status === "loading" && (
          <>
            <CircularProgress />
            <Typography>Confirming payment</Typography>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
            <Typography variant="h5">Funding Confirmed!</Typography>
            <Typography>
              Thank you for your support. Crowdfund details will be sent to your
              email. Payment reference: {paymentRef}
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </>
        )}

        {status === "error" && (
          <Alert severity="error">
            {error || "An error occurred during confirmation"}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default ConfirmFunder;
