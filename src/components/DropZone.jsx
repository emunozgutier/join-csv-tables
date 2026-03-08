import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DataManager from "./DataManager";

function DropZone({ dm, setdm }) {
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const newDm = dm.clone();

    Array.from(files).forEach((file) => {
      if (file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csvString = event.target.result;
          newDm.loadData(file.name, csvString);
        };
        reader.readAsText(file);
      }
    });

    // there is a weird bug where loading the data is not instant
    // so we need to wait a bit before updating the state
    setTimeout(() => {
      setdm(newDm);
    }, 100);
  };

  return (
    <div
      className={`drop-zone glass-panel ${isDragging ? "animate-pulse-dash" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "2px dashed var(--border)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDragging ? "rgba(79, 70, 229, 0.05)" : "transparent",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
    >
      <div
        className="drop-zone-text"
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "var(--text-main)",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {dm.empty ? "Drop CSV tables here" : "Plus more CSV tables!"}
      </div>
      <div
        className="drop-zone-icon"
        style={{
          fontSize: "4rem",
          color: isDragging ? "var(--primary)" : "var(--text-muted)",
          transition: "transform 0.3s ease",
          transform: isDragging ? "scale(1.1)" : "scale(1)"
        }}
      >
        <FontAwesomeIcon icon={faFolderOpen} />
      </div>
      <p className="text-muted mt-3 small">Accepts .csv files</p>
      {isDragging && (
        <div
          className="drop-zone-plus"
          style={{
            position: "absolute",
            left: cursorPosition.x,
            top: cursorPosition.y,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)"
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="2x" color="var(--primary)" />
        </div>
      )}
    </div>
  );
}

DropZone.propTypes = {
  dm: PropTypes.object.isRequired,
  setdm: PropTypes.func.isRequired,
};

export default DropZone;
