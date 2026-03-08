import React from "react";
import PropTypes from "prop-types";
import HelpWindow from "./HelpWindow.jsx";

function MenuBar({ dm, setdm }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom px-4 py-3 mb-4 sticky-top shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-white" href="#" style={{ fontSize: "1.5rem", letterSpacing: "-0.5px" }}>
          join-csv-tables
        </a>
        <button
          className="navbar-toggler border-0 shadow-none"
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
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle fw-medium px-3 text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                File
              </a>
              <ul className="dropdown-menu border-0 shadow-lg p-2" style={{ borderRadius: "var(--radius-md)" }}>
                <li>
                  <label className="dropdown-item rounded py-2 px-3" style={{ cursor: "pointer" }}>
                    New Project
                    <input type="file" style={{ display: "none" }} />
                  </label>
                </li>
                <li>
                  <label className="dropdown-item rounded py-2 px-3" style={{ cursor: "pointer" }}>
                    Load Data...
                    <input type="file" style={{ display: "none" }} />
                  </label>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-medium px-3 text-white"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#helpModal"
              >
                Help
              </a>
            </li>
            <li className="nav-item ms-lg-3">
              <a
                className="btn btn-outline-light btn-sm d-flex align-items-center gap-2 px-3"
                href="https://github.com/emunozgutier/join-csv-tables"
                target="_blank"
                rel="noopener noreferrer"
                style={{ borderRadius: "var(--radius-md)", borderOpacity: 0.3 }}
              >
                <i className="bi bi-github"></i>
                See GitHub
              </a>
            </li>
          </ul>
        </div>
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
