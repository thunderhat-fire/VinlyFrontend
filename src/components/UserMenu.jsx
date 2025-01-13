import { Link } from "react-router-dom";

const UserMenu = () => {
  const menuStyle = {
    // position: "absolute",
    zIndex: "10",
    background: "grey",

    // display: "flex",
    // flexDirection: "column",
    // right: 0,
  };
  return (
    <>
      <ul style={menuStyle}>
        <li>
          <Link to="userProfile">My Profile</Link>
        </li>
        <li>
          <Link to="/currentProjects">Current Projects</Link>
        </li>
        <li>
          <Link to="/updateDetails">Update Details</Link>
        </li>
        <li>
          <Link to="/deleteAccount">Delete Account</Link>
        </li>
      </ul>
    </>
  );
};

export default UserMenu;
