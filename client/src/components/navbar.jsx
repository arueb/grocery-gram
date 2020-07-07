import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGgCircle } from "react-icons/fa";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-info">
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
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Sign Out
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
