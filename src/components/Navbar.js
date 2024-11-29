import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UserMenu from "./UserMenu";
import PersonIcon from "@mui/icons-material/Person";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);

  const menuClickHandler = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
    console.log(showMenu);
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">VinylFunders</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/press-vinyl">Press Vinyl</Link>
        </li>
        <li>
          <Link to="/crowdfunding-gallery">Live Funds</Link>
        </li>
        <li>
          <Link to="/FAQ">FAQ</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <LogoutButton />
            </li>
            <li>
              <img
                src={user.picture}
                referrerPolicy="no-referrer"
                style={{
                  border: "1px solid white",
                  borderRadius: "50%",
                  height: "30px",
                  position: "relative",
                  //using flex just for vertical alignment here
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => menuClickHandler()}
              />
              {showMenu && <UserMenu />}
            </li>
          </>
        ) : (
          <li>
            <LoginButton />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
