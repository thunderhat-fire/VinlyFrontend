import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

export default function SimpleSnackbar({ alertMessage, setAlertMessage }) {
  const [open, setOpen] = useState(false); // State for Snackbar visibility
  const [message, setMessage] = useState(""); // State to store alert message

  // Watch for changes to alertMessage and trigger Snackbar
  useEffect(() => {
    if (alertMessage) {
      setMessage(alertMessage); // Set the message
      setOpen(true); // Open the Snackbar
    }
  }, [alertMessage]);

  // Handle closing of Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false); // Close the Snackbar

    // Reset the alert message to "" to ensure Snackbar can show next time
    setAlertMessage(""); // Reset alertMessage in the parent component
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {message && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
