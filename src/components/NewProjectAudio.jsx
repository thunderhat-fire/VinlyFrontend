import { useState, useRef } from "react";
import {
  Grid2 as Grid,
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import AudioListItem from "./AudioListItem";
import getTrackLength from "../utils/getTrackLength";
import getSideLength from "../utils/getSideLength";
import AddedTrackItem from "./AddedTrackItem";
import { apiStem } from "../utils/variables";
import axios from "axios";
const NewProjectAudio = ({
  user,
  projectId,
  setActiveStep,
  setAlertMessage,
}) => {
  const [aTracks, setATracks] = useState([]);
  const [bTracks, setBTracks] = useState([]);
  const [completedUploadsA, setCompletedUploadsA] = useState(0);
  const [completedUploadsB, setCompletedUploadsB] = useState(0);
  const [uploadState, setUploadState] = useState("none");
  const fileInputRefA = useRef(null);
  const fileInputRefB = useRef(null);
  const addFileHandler = async ({ file, side, title }) => {
    try {
      const name = file.name;
      if (file.type !== "audio/wav") {
        setAlertMessage("invalid format");
      } else {
        const length = await getTrackLength(file);
        if (side === "a") {
          if (length + getSideLength(aTracks).total > 1320) {
            setAlertMessage(
              "Cannot add track - side A would exceed 22 minutes"
            );
          } else {
            setATracks([
              ...aTracks,
              {
                file,
                side,
                preview: false,
                length,
                title,
                id: `${new Date().getTime()}${Math.random()}`,
              },
            ]);
          }
        } else {
          if (length + getSideLength(bTracks).total > 1320) {
            setAlertMessage(
              "Cannot add track - side B would exceed 22 minutes"
            );
          } else {
            setBTracks([
              ...bTracks,
              {
                file,
                side,
                preview: false,
                length,
                title,
                id: `${new Date().getTime()}${Math.random()}`,
              },
            ]);
          }
        }
      }
      clearFileInput();
    } catch (err) {
      console.log(err);
    }
  };

  const clearFileInput = () => {
    // Reset the file input field
    if (fileInputRefA.current) {
      fileInputRefA.current.value = "";
    }
    if (fileInputRefB.current) {
      fileInputRefB.current.value = "";
    }
  };

  const uploadSong = async ({ file, title, side, preview, length }, track) => {
    try {
      const formData = new FormData();
      formData.append("songFile", file);
      formData.append("ownerId", user.sub);
      formData.append("projectId", projectId);
      formData.append("title", title);
      formData.append("track", track); //track number
      formData.append("side", side);
      formData.append("preview", preview);
      formData.append("length", length);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const result = await axios.post(`${apiStem}/songs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
      setActiveStep(`upload error! - ${err}`);
    }
  };

  const uploadHandler = async () => {
    if (aTracks.length === 0) {
      setAlertMessage("Add tracks to side A to continue");
      return;
    } else if (bTracks.length === 0) {
      setAlertMessage("Add tracks to side B to continue");
      return;
    } else if (
      aTracks.filter((track) => track.preview).length +
        bTracks.filter((track) => track.preview).length !==
      1
    ) {
      setAlertMessage("You need to choose a preview track to continue");
      return;
    }
    setUploadState("uploading");
    // Handle uploads for side A tracks
    for (let i = 0; i < aTracks.length; i++) {
      const track = aTracks[i];
      console.log("Uploading A side track:", track.title);
      await uploadSong(track, i + 1); // Ensure uploadSong resolves before moving on
      setCompletedUploadsA((prev) => prev + 1); // Increment completion state for Side A
    }

    // Handle uploads for side B tracks
    for (let i = 0; i < bTracks.length; i++) {
      const track = bTracks[i];
      console.log("Uploading B side track:", track.title);
      await uploadSong(track, i + 1); // Ensure uploadSong resolves before moving on
      setCompletedUploadsB((prev) => prev + 1); // Increment completion state for Side B
    }

    console.log("All uploads complete");
    setUploadState("complete");
    localStorage.setItem(
      "activeProject",
      JSON.stringify({ active: projectId, activeStep: 3 })
    );
    setTimeout(() => setActiveStep(3), 1000);
  };

  const previewHandler = (id) => {
    setATracks((prevATracks) =>
      prevATracks.map((track) => ({
        ...track,
        preview: track.id === id,
      }))
    );

    setBTracks((prevBTracks) =>
      prevBTracks.map((track) => ({
        ...track,
        preview: track.id === id,
      }))
    );
  };
  console.log(aTracks, bTracks);
  const sideStyle = { width: "400px" };
  return (
    <>
      <Typography textAlign={`center`}>
        Please select the audio tracks you want to use on your record. These
        should be in wav format and you are limited to 22 minutes total length
        per side. You may select only one of your songs to be used as a demo
        stream on your project page by setting the preview button.
      </Typography>
      <Grid container direction={"row"} spacing={2} justifyContent="center">
        <Grid item xs={6} sx={sideStyle}>
          <Typography textAlign={`center`}>Side A</Typography>
          {aTracks.map((e, i) => (
            <AddedTrackItem
              title={e.title}
              length={e.length}
              preview={e.preview}
              complete={i + 1 <= completedUploadsA ? true : false}
              previewHandler={previewHandler}
              id={e.id}
            />
          ))}
          <AudioListItem
            // user={user}
            // projectId={projectId}
            // track={aTracks.length + 1}
            side="a"
            addFileHandler={addFileHandler}
            ref={fileInputRefA}
          />
          <Paper>
            Total length = {getSideLength(aTracks).mins} minutes{" "}
            {getSideLength(aTracks).secs} seconds
          </Paper>
        </Grid>
        <Grid item xs={6} sx={sideStyle}>
          <Typography textAlign={`center`}>Side B</Typography>
          {bTracks.map((e, i) => (
            <AddedTrackItem
              title={e.title}
              length={e.length}
              preview={e.preview}
              complete={i + 1 <= completedUploadsB ? true : false}
              previewHandler={previewHandler}
              id={e.id}
            />
          ))}
          <AudioListItem
            // user={user}
            // projectId={projectId}
            // track={bTracks.length + 1}
            side="b"
            addFileHandler={addFileHandler}
            ref={fileInputRefB}
          />
          <Paper>
            Total length = {getSideLength(bTracks).mins} minutes{" "}
            {getSideLength(bTracks).secs} seconds
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: "center" }}>
        {uploadState === "none" && (
          <Button
            onClick={uploadHandler}
            variant="outlined"
            sx={{ margin: "20px auto", display: "block" }}
          >
            Next
          </Button>
        )}
        {uploadState === "uploading" && <Typography>Uploading...</Typography>}
        {uploadState === "complete" && (
          <Typography>Complete! Redirecting...</Typography>
        )}
      </Box>
    </>
  );
};

export default NewProjectAudio;

// {[...Array(6)].map((_, i) => (
//   <AudioListItem
//     user={user}
//     projectId={projectId}
//     key={i}
//     track={i + 1}
//     side="a"
//   />
// ))}

// {[...Array(6)].map((_, i) => (
//   <AudioListItem
//     user={user}
//     projectId={projectId}
//     key={i}
//     track={i + 1}
//     side="b"
//   />
// ))}
