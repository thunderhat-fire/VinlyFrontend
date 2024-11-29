import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { apiStem } from "../utils/variables";

const DeleteAccount = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const deleteAccount = async () => {
    try {
      const result = await axios.delete(`${apiStem}/users/${user.sub}`);
      console.log(result);
      ////////////dont forget to delete user from auth as well!!!!!!
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>Delete Account</h2>
      <p>
        Are you sure you want to delete your account? Deletion is permanent, all
        your account details and projects will be lost and unrecoverable
      </p>
      {isAuthenticated && (
        <button onClick={() => deleteAccount()}>Delete</button>
      )}
    </>
  );
};

export default DeleteAccount;
