import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { apiStem } from "../utils/variables";
import { Navigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid2 as Grid,
  Typography,
  Card,
} from "@mui/material";
import { getMapKey } from "../utils/getMapKey.js";
import { validateField, validateUser } from "../utils/joi.js";

import "./signup.css";
const SignUp = ({ setAlertMessage }) => {
  const [doRedirect, setDoRedirect] = useState(false);

  const { user, isAuthenticated } = useAuth0();
  const [errors, setErrors] = useState({});
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    isAuthenticated &&
      setLocalUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
  }, [isAuthenticated]);
  //   get API key for address search
  useEffect(() => {
    isAuthenticated && getMapKey(user.sub);
    // console.log(user.sub);
  }, [isAuthenticated]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateUser(localUser)) {
        setAlertMessage("Form incomplete - check and resubmit");
      } else {
        const result = await axios.post(`${apiStem}/users`, {
          ...localUser,
          googleId: user.sub,
        });

        setDoRedirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const formUpdater = ({ name, value }) => {
  //   const clone = { ...localUser, [name]: value };

  //   setLocalUser(clone);
  // };
  const formUpdater = (target) => {
    const { name, value } = target;

    // Update the user data state
    setLocalUser((prevData) => ({ ...prevData, [name]: value }));

    // Validate the individual field
    const errorMessage = validateField(name, value, "userSchema");

    // Update the errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };
  console.table(localUser);
  console.log(errors);
  return (
    <div className="signup-container">
      {doRedirect && <Navigate replace to="/" />}
      <h2>Sign Up</h2>
      <p>Complete your profile details to start creating crowdfunds</p>

      <form onSubmit={(e) => onSubmit(e)} className="signup-form">
        <Grid container direction={"column"} spacing={1}>
          <Grid item>
            <TextField
              label="User Name"
              name="username"
              value={localUser.username}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.username}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Full Name"
              name="name"
              value={localUser.name}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.name}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              value={localUser.email}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.email}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Phone"
              name="phone"
              value={localUser.phone}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.phone}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Address"
              name="address"
              value={localUser.address}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.address}</Typography>
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUp;
