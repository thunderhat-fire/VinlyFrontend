import { Link } from "react-router-dom";
import {
  Grid2 as Grid,
  CircularProgress,
  Card,
  Typography,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiStem } from "../utils/variables";

const MyProjects = ({ user, setAlertMessage }) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    getProjects();
  }, [user]);

  const getProjects = async () => {
    try {
      if (user && user.sub) {
        const result = await axios.get(`${apiStem}/projects/all/${user.sub}`);
        console.log(result.data);
        setApiData(result.data);
      }
    } catch (err) {
      setAlertMessage(`couldn't GET projects data. Error - ${err}`);
    }
  };

  if (!apiData) {
    return <CircularProgress />;
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>My Projects</h2>

        <Grid container wrap="wrap" justifyContent="center" spacing={2}>
          {apiData &&
            apiData.map((e, i) => (
              <Grid item key={e.projectId}>
                <Link
                  to={`/crowdfund-details/${e.projectId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card sx={{ width: "300px", height: "300px" }}>
                    <Typography component="h3" variant="h6">
                      {e.projectTitle}
                    </Typography>
                    <Typography>{e.artist}</Typography>
                    <img
                      src={`${apiStem}/images/thumb/${e.frontCover}`}
                      style={{ width: "90%", borderRadius: "10px" }}
                    />
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
        <Box sx={{ margin: "20px" }}>
          <Link to="/createNewProject">Create New Project</Link>
        </Box>
      </div>
    </>
  );
};

export default MyProjects;
