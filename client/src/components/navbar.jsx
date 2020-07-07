import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGgCircle, FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {<FaGgCircle size={50} />}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar6"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse collapse justify-content-stretch"
          id="navbar6"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/shopping-list">
                Shopping List <span className="sr-only">Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/my-recipes">
                My Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/explore-recipes">
                Explore Recipes
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaUserCircle className="mr-1" size={20} />
                    {user.username}
                  </Link>
                  <div
                    className="dropdown-menu mt-3"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <NavLink className="dropdown-item" to="/profile">
                      <FaUser className="mr-1" />
                      My Profile
                    </NavLink>
                    <NavLink className="dropdown-item" to="/logout">
                      <FaSignOutAlt className="mr-1" />
                      Sign Out
                    </NavLink>
                  </div>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
