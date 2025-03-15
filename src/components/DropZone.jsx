import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

function DropZone() {
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
    // Handle file drop logic here
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
        Drop CSV tables here
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

export default DropZone;
