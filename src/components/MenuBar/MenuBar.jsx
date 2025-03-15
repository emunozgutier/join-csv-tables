import React from "react";
import PropTypes from "prop-types";
import HelpWindow from "./HelpWindow.jsx";

function MenuBar({ dm, setdm }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Join-Csv-Tables
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              File
            </a>
            <ul className="dropdown-menu">
              <li>
                <label className="dropdown-item" style={{ cursor: "pointer" }}>
                  New Project
                  <input type="file" style={{ display: "none" }} />
                </label>
              </li>
              <li>
                <label className="dropdown-item" style={{ cursor: "pointer" }}>
                  Load Data...
                  <input type="file" style={{ display: "none" }} />
                </label>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#helpModal"
            >
              Help
            </a>
          </li>
        </ul>
      </div>

      <HelpWindow />
    </nav>
  );
}

MenuBar.propTypes = {
  dm: PropTypes.object.isRequired,
  setdm: PropTypes.func.isRequired,
};

export default MenuBar;
