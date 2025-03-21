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
      className={`drop-zone ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "2px dashed #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDragging ? "#f0f8ff" : "transparent",
        flexDirection: "column",
      }}
    >
      <div
        className="drop-zone-text"
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {dm.empty ? "Drop CSV tables here" : "Drop even MORE CSV tables here"}
      </div>
      <div
        className="drop-zone-icon"
        style={{
          fontSize: "4rem",
          color: isDragging ? "#0d6efd" : "inherit", // Bootstrap blue color
        }}
      >
        <FontAwesomeIcon icon={faFolderOpen} size="4x" />
      </div>
      {isDragging && (
        <div
          className="drop-zone-plus"
          style={{
            position: "absolute",
            left: cursorPosition.x,
            top: cursorPosition.y,
            pointerEvents: "none",
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="2x" color="green" />
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
