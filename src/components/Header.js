import React from "react";
import { Link } from "react-router-dom";
import { IoMdContact } from "react-icons/io";

const Header = ({ active, setActive, user, signOut }) => {
  if (user) {
    var { uid, displayName } = user;
  }

  // console.log(uid);
  // console.log(displayName);

  return (
    <div className="header">
      <div className="container flex">
        <div className="navLinkCard">
          <ul className="navLink flex">
            <li>
              <Link
                to={"/"}
                onClick={() => setActive("home")}
                className={active == "home" ? "linkactive link" : "link"}
              >
                <h3>Home</h3>
              </Link>
            </li>
            {uid && (
              <li>
                <Link
                  to={"/create"}
                  onClick={() => setActive("create")}
                  className={active == "create" ? "linkactive link" : "link"}
                >
                  <h3>Create</h3>
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/about"}
                onClick={() => setActive("about")}
                className={active == "about" ? "linkactive link" : "link"}
              >
                <h3>About</h3>
              </Link>
            </li>
          </ul>
        </div>
        <div className="profile flex">
          {uid ? (
            <div className="flex">
              <div className="flex2">
                <IoMdContact className="icon" />
                <h3>{displayName}</h3>
              </div>
              <Link
                onClick={signOut}
                className={active == "login" ? "linkactive link" : "link"}
              >
                <h3>Logout</h3>
              </Link>
            </div>
          ) : (
            <Link
              to={"/login"}
              onClick={() => setActive("login")}
              className={active == "login" ? "linkactive link" : "link"}
            >
              <h3>Login</h3>
            </Link>
          )}
        </div>
        <div className="ham link"></div>
      </div>
    </div>
  );
};

export default Header;
