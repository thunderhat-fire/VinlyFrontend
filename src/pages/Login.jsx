import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { apiStem } from "../utils/variables";
import { Navigate } from "react-router-dom";
import Toast from "../components/Toast";
import axios from "axios";

const Login = ({ setAlertMessage }) => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const [newUser, setNewUser] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [userCheckComplete, setUserCheckComplete] = useState(false);

  useEffect(() => {
    isAuthenticated && checkUser(user.sub);
  }, [isAuthenticated]);

  const checkUser = async (sub) => {
    try {
      const { data } = await axios.get(`${apiStem}/users/${sub}`);
      //check if existing user or new account and direct accordingly
      console.log("login step", data);
      data.id ? setNewUser(false) : setNewUser(true);
      setUserCheckComplete(true);
    } catch (err) {
      console.log(err);
      setLoginError(true);
      setAlertMessage("Login Error : returning to homepage");
    }
  };

  return (
    <>
      <p>Logging in...</p>
      {userCheckComplete && <Navigate replace to={newUser ? "/signup" : "/"} />}
      {loginError && (
        <>
          <Navigate replace to={"/"} />
        </>
      )}
    </>
  );
};

export default Login;
