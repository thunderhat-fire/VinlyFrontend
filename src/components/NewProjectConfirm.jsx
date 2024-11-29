import { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { apiStem } from "../utils/variables";
const NewProjectConfirm = ({ projectId, user, setAlertMessage }) => {
  const [doRedirect, setDoRedirect] = useState(false);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getAlbumData();
  }, []);

  const getAlbumData = async () => {
    try {
      const result = await axios.get(`${apiStem}/projects/single/${projectId}`);
      console.log(result);
      setApiData(result.data);
    } catch (err) {
      setAlertMessage(`couldn't GET album data. Error - ${err}`);
    }
  };
  const completeHandler = async () => {
    try {
      const result = await axios.put(
        `${apiStem}/projects/complete/${projectId}` //set project complete
      );
      localStorage.removeItem("activeProject"); //wipe current project from local storage
      setTimeout(() => {
        setDoRedirect(true);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const filterAndSortSongs = (side) => {
    if (apiData) {
      const filtered = apiData.songArray.filter((e) => e.side === side);
      const sorted = filtered.sort((a, b) => a.track - b.track);
      return sorted;
    }
  };

  filterAndSortSongs("a");
  const goBackHandler = () => {};
  console.log(apiData);
  return (
    <>
      {doRedirect && <Navigate replace to="/" />}
      {apiData && (
        <Box sx={{ textAlign: "center" }}>
          <Typography component={"h3"} variant={"h3"}>
            {apiData.projectTitle}
          </Typography>
          <Typography component={"h2"} variant={"h4"}>
            {apiData.artist}
          </Typography>
          <Typography>{apiData.description}</Typography>
          <Box>
            <Typography component="h4" variant="h5">
              Track Listing
            </Typography>
            <Box
              sx={{ display: "flex", gap: "20px", justifyContent: "center" }}
            >
              <Box>
                <Typography component="h5" variant="h6">
                  Side A
                </Typography>
                <ul>
                  {filterAndSortSongs("a").map((e) => (
                    <li>{e.title}</li>
                  ))}
                </ul>
              </Box>
              <Box>
                <Typography component="h5" variant="h6">
                  Side B
                </Typography>
                <ul>
                  {filterAndSortSongs("b").map((e) => (
                    <li>{e.title}</li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {apiData.thumbArray.map((e, i) => (
              <Box>
                <Typography variant="h5">
                  {i === 0 ? "Front cover" : "Back cover"}
                </Typography>
                <img
                  src={`${apiStem}/images/thumb/${e}`}
                  alt={i === 0 ? "Project front cover" : "project back cover"}
                  style={{ width: "90%", maxWidth: "500px" }}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              sx={{ margin: "20px" }}
              onClick={goBackHandler}
            >
              Back (inactive)
            </Button>
            <Button
              variant="outlined"
              sx={{ margin: "20px" }}
              onClick={completeHandler}
            >
              Complete
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NewProjectConfirm;
