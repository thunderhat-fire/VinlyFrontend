import {
  Grid2 as Grid,
  TextField,
  Typography,
  Button,
  Card,
} from "@mui/material";
import axios from "axios";
import { apiStem } from "../utils/variables";
import { useState } from "react";
import { validateField, validateProjectText } from "../utils/joi";

const NewProjectText = ({
  setAlertMessage,
  projectId,
  tempProjectId,
  target,
  user,
  setActiveStep,
}) => {
  const [textData, setTextData] = useState({
    projectTitle: "",
    artist: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const formUpdater = (target) => {
    const { name, value } = target;

    // Update the user data state
    setTextData((prevData) => ({ ...prevData, [name]: value }));

    // Validate the individual field
    const errorMessage = validateField(name, value, "projectTextSchema");

    // Update the errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const onSubmit = async (data) => {
    data.preventDefault();
    try {
      if (!validateProjectText(textData)) {
        setAlertMessage("Form incomplete - check and resubmit");
      } else {
        console.log(textData);
        console.log(tempProjectId);
        const result = await axios.post(`${apiStem}/projects`, {
          ...textData,
          ownerId: user.sub,
          projectId,
          tempProjectId,
          fundTarget: target,
        });
        localStorage.setItem(
          "activeProject",
          JSON.stringify({ active: projectId, activeStep: 1 })
        );
        setActiveStep(1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {" "}
      <form onSubmit={(e) => onSubmit(e)} className="signup-form">
        <Grid container direction={"column"} spacing={1}>
          <Grid item>
            <TextField
              label="Project Title"
              name="projectTitle"
              value={textData.projectTitle}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.projectTitle}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Artist"
              name="artist"
              value={textData.artist}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.artist}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Description"
              name="description"
              multiline
              maxRows={5}
              value={textData.description}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.description}</Typography>
          </Grid>
        </Grid>
        <Button type="submit" variant="outlined" sx={{ margin: "20px" }}>
          Next
        </Button>
      </form>
    </>
  );
};

export default NewProjectText;
