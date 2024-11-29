import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { apiStem } from "../utils/variables";
import { Navigate } from "react-router-dom";
import "./signup.css";
import { getMapKey } from "../utils/getMapKey";
import { TextField, Button, Grid2 as Grid, Typography } from "@mui/material";
import AddressAutocomplete from "mui-address-autocomplete";
import { validateField } from "../utils/joi.js";
const UpdateDetails = ({ setAlertMessage }) => {
  const [doRedirect, setDoRedirect] = useState(false);
  const [key, setKey] = useState("");
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [errors, setErrors] = useState({});
  const [oldUserData, setOldUserData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    address: "",
  });
  const getOldUserData = async () => {
    const result = await axios.get(`${apiStem}/users/${user.sub}`);

    const { name, email, phone, address, username } = result.data;
    setOldUserData({ name, email, phone, address, username });
  };
  useEffect(() => {
    isAuthenticated && getOldUserData();
  }, [isAuthenticated]);
  ////form updater
  //
  const formUpdater = (target) => {
    const { name, value } = target;

    // Update the user data state
    setOldUserData((prevData) => ({ ...prevData, [name]: value }));

    // Validate the individual field
    const errorMessage = validateField(name, value);

    // Update the errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  console.log(errors);
  const formAddressUpdater = (value = "") => {
    console.log(value);
    setOldUserData({ ...oldUserData, address: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submit data", oldUserData);
      const result = await axios.put(
        `${apiStem}/users/${user.sub}`,
        oldUserData
      );
      console.log(result);
      setDoRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };
  //   get API key for address search

  const mapHandler = async () => {
    const reply = await getMapKey(user?.sub);

    reply?.status === 200
      ? setKey(reply.data)
      : setAlertMessage("Map Key Error");
  };
  useEffect(() => {
    if (isAuthenticated) {
      mapHandler();
    }
  }, [isAuthenticated]);

  return (
    <>
      {doRedirect && <Navigate replace to="/" />}{" "}
      <form onSubmit={(e) => onSubmit(e)} className="signup-form">
        <Grid container direction={"column"} spacing={1}>
          <Grid item>
            <TextField
              label="User Name"
              name="username"
              value={oldUserData.username}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.username}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Full Name"
              name="name"
              value={oldUserData.name}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.name}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              name="email"
              value={oldUserData.email}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.email}</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Phone"
              name="phone"
              value={oldUserData.phone}
              onChange={(e) => formUpdater(e.target)}
            />
            <Typography>{errors.phone}</Typography>
          </Grid>
          <Grid item>
            {/* <TextField
              label="Address"
              name="address"
              value={oldUserData.address}
              onChange={(e) => formUpdater(e.target)}
            /> */}
            <AddressAutocomplete
              sx={{ width: "100%" }}
              apiKey={key}
              autoComplete={false}
              value={oldUserData.address}
              label="Address"
              fields={["geometry"]} // fields will always contain address_components and formatted_address, no need to repeat them
              onChange={(_, value) =>
                formAddressUpdater(value?.formatted_address)
              }
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UpdateDetails;
