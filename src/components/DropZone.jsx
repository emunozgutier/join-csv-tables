import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import useStore from "../store/useStore";

function DropZone() {
  const { setConflictsData, loadFiles } = useStore();
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

  const scanFileEntry = (entry, path = "") => {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file) => {
          if (file.name.endsWith(".csv")) {
            const displayName = path ? `${path}/${file.name}` : file.name;
            resolve([{ file, name: displayName, originalName: file.name }]);
          } else {
            resolve([]);
          }
        });
      } else if (entry.isDirectory) {
        const directoryReader = entry.createReader();
        const newPath = path ? `${path}/${entry.name}` : entry.name;
        directoryReader.readEntries(async (entries) => {
          const files = await Promise.all(entries.map((e) => scanFileEntry(e, newPath)));
          resolve(files.flat());
        });
      } else {
        resolve([]);
      }
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    const fileEntries = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        fileEntries.push(item);
      }
    }

    const allFiles = (await Promise.all(fileEntries.map((entry) => scanFileEntry(entry)))).flat();
    
    // Group files by original name to detect conflicts
    const grouped = allFiles.reduce((acc, fileItem) => {
      const name = fileItem.originalName;
      if (!acc[name]) acc[name] = [];
      acc[name].push(fileItem);
      return acc;
    }, {});

    const duplicateNames = Object.keys(grouped).filter(name => grouped[name].length > 1);

    if (duplicateNames.length > 0) {
      setConflictsData(grouped, duplicateNames);
    } else {
      loadFiles(allFiles);
    }
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
        cursor: "pointer",
        overflow: "hidden"
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
        Drop CSV tables or folders here
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
      <p className="text-muted mt-3 small">Accepts .csv files and folders</p>
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

export default DropZone;
