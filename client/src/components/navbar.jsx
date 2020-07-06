import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGgCircle } from "react-icons/fa";

const Navbar = () => {
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
          <li className="nav-item active">
            <Link className="nav-link" to="/shopping-list">
              Shopping List <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-recipes">
              My Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/explore-recipes">
              Explore Recipes
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
