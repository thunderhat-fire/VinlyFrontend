import {
  Grid2 as Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { apiStem } from "../utils/variables";
import axios from "axios";
import getImageDimensions from "../utils/getImageDimensions";
const NewProjectImages = ({
  setAlertMessage,
  user,
  projectId,
  setActiveStep,
}) => {
  const [uploadStates, setUploadStates] = useState({
    frontCover: null,
    backCover: null,
  }); // upload states are null, 'uploading', 'complete', 'error'
  const [thumbIds, setThumbIds] = useState({
    frontCover: null,
    backCover: null,
  });
  const [thumbUrls, setThumbUrls] = useState({
    frontCover: null,
    backCover: null,
  });

  const onSubmit = async (data) => {
    data.preventDefault();
    try {
      console.log("Images uploaded");
      localStorage.setItem(
        "activeProject",
        JSON.stringify({ active: projectId, activeStep: 2 })
      );
      setActiveStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  const imageUploadHandler = async (e) => {
    try {
      const validFileTypes = ["image/png", "image/webp", "image/jpeg"];
      const file = e.target.files[0];
      const name = e.target.name;

      if (validFileTypes.includes(file?.type)) {
        const { width, height } = await getImageDimensions(file);

        if (width >= 2000 && height >= 2000 && width === height) {
          setUploadStates((prevState) => ({
            ...prevState,
            [name]: "uploading",
          }));
          const formData = new FormData();
          formData.append("imageFile", file);
          formData.append("ownerId", user.sub);
          formData.append("projectId", projectId);
          formData.append("type", name);

          const result = await axios.post(`${apiStem}/images`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (result.status === 200) {
            setUploadStates((prevState) => ({
              ...prevState,
              [name]: "complete",
            }));
            setThumbIds((prevState) => ({
              ...prevState,
              [name]: result.data.thumbId,
            }));
          } else {
            setUploadStates((prevState) => ({ ...prevState, [name]: "error" }));
          }
        } else {
          setAlertMessage(
            "Image must be at least 2000 x 2000 resolution and exactly square"
          );
        }
      } else {
        setAlertMessage("Invalid file format. Choose from PNG, JPEG, or WEBP.");
      }
    } catch (err) {
      setUploadStates((prevState) => ({ ...prevState, [name]: "error" }));
      console.log(err);
    }
  };

  useEffect(() => {
    // Fetch thumbnail URLs based on thumbIds
    const fetchThumbUrls = async () => {
      for (const [key, id] of Object.entries(thumbIds)) {
        if (id && !thumbUrls[key]) {
          try {
            const result = await axios.get(`${apiStem}/images/thumb/${id}`, {
              responseType: "blob",
            });
            const imgUrl = URL.createObjectURL(result.data);
            setThumbUrls((prevState) => ({ ...prevState, [key]: imgUrl }));
          } catch (err) {
            console.log("Error fetching thumbnail:", err);
          }
        }
      }
    };

    fetchThumbUrls();

    // Cleanup object URLs on unmount
    return () => {
      Object.values(thumbUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [thumbIds]);

  return (
    <>
      <form onSubmit={onSubmit} className="signup-form">
        <Typography>
          Please select images for your front and back cover. These should be
          square images (width and height are the same number of pixels) in
          webp, png, or jpg format with minimum dimensions 2000 x 2000 pixels.
        </Typography>
        <Grid container spacing={2} direction="column" justifyContent="center">
          <Grid item xs="6">
            <Typography>Front Cover</Typography>
            {uploadStates.frontCover === "uploading" ? (
              <CircularProgress />
            ) : uploadStates.frontCover === "error" ? (
              <p>Error uploading front cover.</p>
            ) : uploadStates.frontCover === "complete" ? (
              <>
                {thumbUrls.frontCover ? (
                  <img src={thumbUrls.frontCover} alt="Front Cover Thumbnail" />
                ) : (
                  <p>Loading thumbnail...</p>
                )}
              </>
            ) : (
              <TextField
                type="file"
                name="frontCover"
                onChange={imageUploadHandler}
              />
            )}
          </Grid>
          <Grid item xs="6">
            <Typography>Back Cover</Typography>
            {uploadStates.backCover === "uploading" ? (
              <CircularProgress />
            ) : uploadStates.backCover === "error" ? (
              <p>Error uploading back cover.</p>
            ) : uploadStates.backCover === "complete" ? (
              <>
                {thumbUrls.backCover ? (
                  <img src={thumbUrls.backCover} alt="Back Cover Thumbnail" />
                ) : (
                  <p>Loading thumbnail...</p>
                )}
              </>
            ) : (
              <TextField
                type="file"
                name="backCover"
                onChange={imageUploadHandler}
              />
            )}
          </Grid>
        </Grid>
        {uploadStates.frontCover === "complete" &&
          uploadStates.backCover === "complete" && (
            <Button type="submit" variant="outlined" sx={{ margin: "20px" }}>
              Next
            </Button>
          )}
      </form>
    </>
  );
};

export default NewProjectImages;
