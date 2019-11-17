import React, { useContext } from "react";
import { Link } from "@reach/router";
import MapContext from "../MapContext"

let Nav = () => {
  const { state, dispatch } = useContext(MapContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        GPSmagic
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter by Type
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="type/motorcycling">
                Motorcycling
              </Link>
              <Link className="dropdown-item" to="type/walking">
                Walking
              </Link>
              <Link className="dropdown-item" to="type/sailing">
                Sailing
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter by Continent
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="type/motorcycling">
                Europe
              </Link>
              <Link className="dropdown-item" to="type/walking">
                Asia
              </Link>
              <Link className="dropdown-item" to="type/sailing">
                North America
              </Link>
            </div>
          </li>
          {/* <li className="nav-item active">
            <Link className="nav-link" to="type/motorcycle">
              Motorcycling
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="type/walking">
              Walking
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="type/sailing">
              Sailing
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="upload">
              Upload
            </Link>
          </li>
          <li className="nav-item" style={{display: state.user ? "none" : "block"}}>
            <Link className="nav-link" to="signup">
              Sign Up
            </Link>
          </li>
          <li className="nav-item" style={{display: state.user ? "none" : "block"}}>
            <Link className="nav-link" to="login">
              Log In
            </Link>
          </li>
          <li className="nav-item" style={{display: state.user ? "block" : "none"}}>
            <Link className="nav-link" to="#" onClick={() => dispatch({type: "signout"})}>
              Log Out
            </Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="#">
            {state.user && state.user.email}
            </Link>
          </li>
          
        </ul>
      </div>
      <hr />
    </nav>
  );
};

export default Nav;
